package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

type contents struct {
	IsFloder bool        `json:"type"`
	FileName string      `json:"name"`
	Path     string      `json:"path"`
	FileList []*contents `json: "children"`
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
	root := contents{true, "Files", "./Files", []*contents{}}

	walk("./Files", &root)
	data, _ := json.Marshal(root)

	fmt.Printf("%s", data)
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")
		files, _ := ioutil.ReadDir("./Files")
		FileNames := []string{}
		for _, file := range files {
			FileNames = append(FileNames, file.Name())
		}
		c.JSON(200, gin.H{
			"message": FileNames,
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
