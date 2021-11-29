import React, { useEffect, useState } from "react"
import GoogleLogin from "react-google-login"
import  { gql, useMutation } from "@apollo/client"
import { GetSocialUserData } from "./__generated__/GetSocialUserData"
import { currentUserVar } from "../../common/apollo-client/apollo-client"
import { useHistory } from "react-router"

interface Props {

}

const GET_SOCIAL_USER_DATA = gql`
	mutation GetSocialUserData($accessToken: String!, $name:String, $profilePicture: String ) {
  		socialAuth(
				input: {
					provider: "google-oauth2", 
					accessToken: $accessToken,
					name: $name
					profilePicture: $profilePicture
				}
			) {
			token
			social {
				user {
					id
					name
					# email
					profilePicture
				}
			}
  		}
	}
`

const Authenticate: React.FC<Props> = () => {

	const [getAccessToken, { loading, error, data }] = useMutation<GetSocialUserData>(GET_SOCIAL_USER_DATA, {
		onCompleted: (data) => {
			// Save the access token
			localStorage.setItem("accessToken", data.socialAuth?.token!);
			
			// Save the user data
			const user = data.socialAuth?.social?.user
			const currentUserData = {
				id: user?.id!,
				name: user?.name!,
				profilePicture: user?.profilePicture!
			} 
			currentUserVar(currentUserData)
			localStorage.setItem("currentUserVar", JSON.stringify(currentUserData));

			// Redirect
			history.push('/courses/')
		}
	}) 

	const history = useHistory()

	return (
		<div
			className="main-margin rtl"
		>
			<div 
				className="bg-secondary-100 text-secondary grid grid-cols-1 gap-4 rounded-lg p-4 md:p-8"
			>
				<p
					className="font-semibold text-lg md:text-xl"
				>
					تسجيل الدخول باستخدام جوجل:
				</p>
				<GoogleLogin
                    clientId="73120554730-82s2uiknaofet84matprd588r7vabgua.apps.googleusercontent.com"
                    render={props => (
                        <button 
                            onClick={props.onClick} 
                            disabled={props.disabled} 
                            className="rounded-md bg-primary text-secondary min-w-full min-h-full font-bold text-xl md:text-2xl h-16"
                        >
                            <div className="h-full w-full flex items-center justify-center">
                                <p>
								oogle<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" className="h-8 md:h-10 inline mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
									<path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
									</path>
								</svg>
                                    
                                </p>
                            </div>
                        </button>
                    )}
                    accessType="offline"
                    onSuccess={(data: any) => {
						const accessToken = data.tokenObj.access_token;
						const name = data.profileObj.name
						const profilePicture = data.profileObj.imageUrl

						getAccessToken({
							variables: {
								// Google OAuth2's access token
								accessToken: accessToken,
								name: name,
								profilePicture: profilePicture 
							}
						})
						console.log(data)
					}}
                    onFailure={(e) => {console.log(e)}} 
                    cookiePolicy={'single_host_origin'}

                />
			</div>
		</div>
	)
}

export default Authenticate