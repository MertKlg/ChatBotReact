import axios from "axios";

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE"
let BASE_URL = "https://jsonplaceholder.typicode.com"

interface RequestBody{
    url : string,
    body? : {},
    method : RequestMethods | "GET",
    headers? : {},
    params? : {}
}

const request = async (requestBody : RequestBody) => {
    return await axios(
        {
            baseURL : "https://jsonplaceholder.typicode.com",
            url : requestBody.url,
            method : requestBody.method,
            data : requestBody.body,
            headers : requestBody.headers
        }
    )
}



describe("a get data test from any source", () => {
    it("jsonplaceholder/test", async() => {
        const res = await request({url : "/posts", method : "GET"})

        expect(res.status).toBe(200)
    })
})