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
			className="w-full h-full rtl"
		>
			<div 
				className="mx-48 my-8 bg-secondary-100 text-secondary grid grid-cols-1 gap-4 rounded-lg p-8"
			>
				<p
					className="font-semibold text-xl"
				>
					دخول باستخدام جوجل:
				</p>
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