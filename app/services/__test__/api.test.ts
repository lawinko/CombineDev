import { Api, DEFAULT_API_CONFIG } from "../api/api"
import Config from "../../config"

describe("Api", () => {
  it("should be configured with the default config", () => {
    const api = new Api()
    expect(api.config).toEqual(DEFAULT_API_CONFIG)
    expect(api.apisauce).toBeDefined()
    expect(api.config.url).toBe(Config.API_URL)
    expect(api.config.timeout).toBe(10000)
  })

  it("should allow custom configuration", () => {
    const customConfig = {
      url: "https://custom-api.com",
      timeout: 20000,
    }
    const api = new Api(customConfig)
    expect(api.config).toEqual(customConfig)
    expect(api.config.url).toBe(customConfig.url)
    expect(api.config.timeout).toBe(customConfig.timeout)
  })
})
