/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface ApiLoginResponse {
  access_token: string,
  refresh_token: string
}

export interface ApiRefreshTokenResponse {
  access_token: string,
  refresh_token: string
}

export interface ApiLocationResponse {
  latitude: number;
  longitude: number;
  placeID: string;
  formattedAddress: string;
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
