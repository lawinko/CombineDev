/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import { Alert } from "react-native"
import { getGeneralApiProblem } from "./apiProblem"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.apisauce.addResponseTransform(response => {
      if (!response.ok && response.problem !== 'CLIENT_ERROR') {
        const error = getGeneralApiProblem(response)
        if (error) {
          Alert.alert('Error', error.kind)
        }

      }
    })
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.apisauce.setHeader('Authorization', `Bearer ${token}`);
    } else {
      this.apisauce.deleteHeader('Authorization');
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
