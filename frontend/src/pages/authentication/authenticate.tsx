import React, { useState } from "react"
import GoogleLogin from "react-google-login"
import  { gql, useMutation } from "@apollo/client"
import { GetAccessToken } from "./__generated__/GetAccessToken"

interface Props {

}

const GET_ACCESS_TOKEN = gql`
	mutation GetAccessToken($accessToken: String!) {
  		socialAuth(
				input: {
				provider: "google-oauth2", 
				accessToken: $accessToken
				}
			) {
			token
  		}
	}
`

const Authenticate: React.FC<Props> = () => {

	const [getAccessToken, { loading, error, data }] = useMutation<GetAccessToken>(GET_ACCESS_TOKEN, {
		onCompleted: (data) => {
			localStorage.setItem("accessToken", data.socialAuth?.token!);
		}
	}) 

	return (
		<div
			className="w-full h-full bg-secondary-100 text-secondary grid grid-cols-1 gap-4"
		>
			<div>
				<GoogleLogin
                    clientId="73120554730-82s2uiknaofet84matprd588r7vabgua.apps.googleusercontent.com"
                    render={props => (
                        <button 
                            onClick={props.onClick} 
                            disabled={props.disabled} 
                            className="rounded-md bg-primary text-secondary min-w-full min-h-full font-bold text-2xl h-16"
                        >
                            <div className="h-full w-full flex items-center justify-center space-x-2">
                                <p>
                                    Google
                                </p>
                            </div>
                        </button>
                    )}
                    accessType="offline"
                    onSuccess={(data: any) => {
						const accessToken = data.tokenObj.access_token;
						getAccessToken({
							variables: {
								// Google OAuth2's access token
								accessToken: accessToken 
							}
						})
					}}
                    onFailure={(e) => {console.log(e)}} 
                    cookiePolicy={'single_host_origin'}

                />
			</div>
		</div>
	)
}

export default Authenticate