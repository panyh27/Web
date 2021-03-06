package main

import (
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

type contents struct {
	IsFloder bool        `json:"type"`
	FileName string      `json:"name"`
	Path     string      `json:"path"`
	FileList []*contents `json:"children"`
}

func walk(path string, node *contents) {
	// 列出当前目录下的所有目录、文件
	files := listFiles(path)
	// 遍历这些文件
	for _, FileName := range files {
		// 拼接全路径
		fpath := filepath.Join(path, FileName)
		// 构造文件结构
		fio, _ := os.Lstat(fpath)
		isDir := fio.IsDir()
		// 将当前文件作为子节点添加到目录下
		child := contents{isDir, FileName, fpath, []*contents{}}
		node.FileList = append(node.FileList, &child)

		// 如果遍历的当前文件是个目录，则进入该目录进行递归
		if isDir {
			walk(fpath, &child)
		}
	}
	return
}
func listFiles(dirname string) []string {
	f, _ := os.Open(dirname)
	names, _ := f.Readdirnames(-1)
	f.Close()
	return names
}

func main() {
	r := gin.Default()

	r.GET("/blog", func(c *gin.Context) {
		root := contents{true, "Files", "./Files", []*contents{}}
		walk("./Files", &root)
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.JSON(200, &root.FileList)
	})
	r.GET("/files", func(c *gin.Context) {
		filePath := c.Query("filePath")
		data, _ := ioutil.ReadFile(filePath)
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Content-Type", "application/octet-stream")
		c.Header("Content-Disposition", "attachment; filename="+filePath)
		c.String(200, string(data))
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
