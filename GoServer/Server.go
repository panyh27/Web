package main

import (
	"io/ioutil"

	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")
		files, _ := ioutil.ReadDir("./Files")
		fileNames := []string{}
		for _, file := range files {
			fileNames = append(fileNames, file.Name())
		}
		c.JSON(200, gin.H{
			"message": fileNames,
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
