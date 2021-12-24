import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react"
import { isConstructorDeclaration } from "typescript";
import { RandomPoints, randomPointsVar } from "../../apollo-client/apollo-client";

// import './background-icons.css'

interface Props {

}

// const iconStyle: any = {
// 	position: "absolute",
// 	top: Math.floor(Math.random() * 1000).toString()
// }

const populateRandomPoints = (randomPoints: RandomPoints | null) => {
	const maxWidth = 50
	const minWidth = 45 
	const margin = 20
	var points: RandomPoints = randomPoints || []
	
	for (var i=0; i<1000; i++){
		console.log(i)

		var randTop = Math.floor(Math.random() * window.screen.height)
		var randLeft = Math.floor(Math.random() * (window.screen.width - maxWidth))
		var randWidth = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth)
		
		if (points.length === 0) {
			
			// Initial 
			points = points.concat({
				top: randTop,
				left: randLeft,
				size: randWidth,
				// transform: "rotate(30deg)"
			})
		} else {

			var clear = true;
			for (var point=0; point<points.length; point++){
				// GET THE DISTANCE 
				var randCenterX = randTop + Math.floor((randWidth/2))
				var randCenterY = randLeft + Math.floor((randWidth/2))
				var pointCenterX = points[point].top + Math.floor((points[point].size/2))
				var pointCenterY = points[point].left + Math.floor((points[point].size/2))
				const distance = Math.sqrt((randCenterX - pointCenterX) ** 2 + (randCenterY - pointCenterY) ** 2);
				if (
					distance < (points[point].size/2 + randWidth/2) + margin
				) {
					// break
					clear = false;
					break;
				}
			} 

			if (clear) {
				points = points.concat({
					top: randTop,
					left: randLeft,
					size: randWidth
				})
			}
		}
	}

	randomPointsVar(points)
}

const populateDiagonalPoints = (randomPoints: RandomPoints | null) => {
	var points: RandomPoints = randomPoints || []
	const width = 30
	const height = 30
	const margin = 10
	
	var tick = false
	for (var i=-width/2; i<window.screen.width + width; i+=width + margin){
		for (var j=-height/2; j<window.screen.height + height; j+=height + margin){
			console.log(tick)
			points = points.concat({
				top: j + height * ( tick ? 1 : -1 ),
				left: i,
				size: width,
			})

		}
		tick = !tick
	}
	randomPointsVar(points)
	localStorage.setItem("randomPointsVar", JSON.stringify(points))
}

const createIcons = (randomPoints: RandomPoints | null) => {
	var iconStyles:any = [];
	if (!randomPoints) {
		return
	}

	randomPoints.forEach((point, index) => {
		var randOpacity = Math.floor(Math.random() * 80)

		iconStyles = iconStyles.concat({
			position: "absolute",
			top: point.top,
			left: point.left,
			width: `${(point.size).toString()}px`,
			height: `${(point.size).toString()}px`,
			opacity: `${(3).toString()}%`,
			// strokeWidth: "0.2"
		})
	})
	return iconStyles
}

const BackgroundIcons: React.FC<Props> = () => {

	const randomPoints = useReactiveVar(randomPointsVar)
	const iconStyles = createIcons(randomPoints || null)
	const iconNum = 8
	// console.log(iconNum)
	useEffect(() => {
		if (!randomPoints) {
			populateDiagonalPoints(randomPoints)
		} else {
			// SCREEN HAS CHANGED!
			if (randomPoints[randomPoints.length-1].top < window.screen.width && randomPoints[randomPoints.length-1].top < window.screen.height) {
				populateDiagonalPoints(randomPoints)
			}
		}
	}, [])

	return (
		<div
			className="fixed top-0 h-screen w-full text-secondary-100"
			style={{
				zIndex: 0
			}}
		>
			<div
				className="h-full w-full relative"
			>
				{iconStyles?.length > 0 && [...Array(iconStyles.length)].map((i, index) => {return (
					<div>
						{index % iconNum === 0 &&
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path></svg>
						}
						{index % iconNum === 1 && 
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="university" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"></path></svg>
						}
						{index % iconNum === 2 && 
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>
						}
						{index % iconNum === 3 && 
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="puzzle-piece" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path></svg>
						}
						{index % iconNum === 4 && 
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path></svg>
						}
						{index % iconNum === 5 && 
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>
						}
						{index % iconNum === 6 && 
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="brain" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M208 0c-29.9 0-54.7 20.5-61.8 48.2-.8 0-1.4-.2-2.2-.2-35.3 0-64 28.7-64 64 0 4.8.6 9.5 1.7 14C52.5 138 32 166.6 32 200c0 12.6 3.2 24.3 8.3 34.9C16.3 248.7 0 274.3 0 304c0 33.3 20.4 61.9 49.4 73.9-.9 4.6-1.4 9.3-1.4 14.1 0 39.8 32.2 72 72 72 4.1 0 8.1-.5 12-1.2 9.6 28.5 36.2 49.2 68 49.2 39.8 0 72-32.2 72-72V64c0-35.3-28.7-64-64-64zm368 304c0-29.7-16.3-55.3-40.3-69.1 5.2-10.6 8.3-22.3 8.3-34.9 0-33.4-20.5-62-49.7-74 1-4.5 1.7-9.2 1.7-14 0-35.3-28.7-64-64-64-.8 0-1.5.2-2.2.2C422.7 20.5 397.9 0 368 0c-35.3 0-64 28.6-64 64v376c0 39.8 32.2 72 72 72 31.8 0 58.4-20.7 68-49.2 3.9.7 7.9 1.2 12 1.2 39.8 0 72-32.2 72-72 0-4.8-.5-9.5-1.4-14.1 29-12 49.4-40.6 49.4-73.9z"></path></svg>
						}
						{index % iconNum === 7 && 
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" style={iconStyles[index]} className="inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
						}
					</div>
				)})}
			</div>
			{/* <div
				className="h-full w-full absolute top-0 px-40"
			>
				<div
					className="w-full h-full bg-secondary opacity-90 shadow-2xl"
				>
				</div>
			</div> */}
		</div>
	)
}

export default BackgroundIcons