/*eslint no-console: 0*/
import React from 'react'
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class CanvasAirplane extends PureComponent {
	constructor({
		height = 13,
		width = 156,
		adaptive = true, //включить адаптивность
		autoRepeat = true, //автоповторение (для режима 20)
		workType = 10, //типы работы: 10 - бесконечный полет сразу в 2/3 от А
		//  			11 - бесеонечный полет в начале анимации стартует из точки А
		//				20 - взлет из А и посадка в Б
		delayOnRepeat = 300, //задержка на автоповтор
		colors = {}, //цветовое оформление
		speedExhaustCloud = 27, //скорость шлейфа самолета
		lengthExhaustCloud = 100, //длина шлейфа самолета (от 0 до 1000),
		// !фактическая длина зависит также от скорости шлейфа, 0 - нет шлейфа
		planeScaleOnGroundKof = 1, //коэфициент уменьшения самолета на 'земле'
		//  в воздухе размер фиксировано в 0.9 от ширины canvas
		apexDot1 = 10, // точка в которой самолет 'наберет высоту' считая от начала, процент от общей длины
		apexDot2 = 10, // точка в кторой самолет 'начнет снижаться' считая от конца, процент от общей длины
		speedFlight = 0.25, //скорость полета самолета (от 0 до 100)
		runWayK = 0, //длительность анимации взлетнопопсадочной полосы от 0 до 50, 0 - полосы отсутствуют
		runwayType = 0, // тип взлетно-посадочной полосы 0 / 1
		fireJetFlag = false //показывать реактивное сопло
	}) {
		super()
		colors.plumeeExColors = colors.plumeeExColors || [
			//цвет внешнего 'пламени' двигателя (градиент)
			{ level: 1, color: '#d2d5d6' },
			{ level: 0, color: '#d2d5d6' }
		]
		colors.plumeeInColors = colors.plumeeInColors || [
			//цвет внутреннего 'пламени' двигателя (градиент)
			{ level: 1, color: '#a8abac' },
			{ level: 0, color: '#a8abac' }
		]
		colors.planeColor = colors.planeColor || '#d2d5d6' //цвет самолета !!HEX!! формат обезателен для этого параметра
		colors.cloudColor = colors.cloudColor || '#dbdedf' //цвет шлейфа !!HEX!! формат обезателен для этого параметра
		colors.backgroundColor = colors.backgroundColor || '#ffffff' //цвет фона
		colors.runwayColor = colors.runwayColor || '#d2d5d6' //цвет взлетнопосадочной полосы !!HEX!! формат обезателен для этого параме
		//внутренние параметры
		let progress = 0,
			residueDelOnRpt = delayOnRepeat

		this.state = {
			height,
			width,
			progress,
			adaptive,
			autoRepeat,
			workType,
			residueDelOnRpt,
			delayOnRepeat,
			colors,
			speedExhaustCloud,
			lengthExhaustCloud,
			runwayType,
			planeScaleOnGroundKof,
			apexDot1,
			apexDot2,
			speedFlight,
			fireJetFlag,
			runWayK
		}
		this.updateAnimationState = this.updateAnimationState.bind(this)
		this.canvasRef = React.createRef()
	}

	componentDidMount() {
		this.rAF = requestAnimationFrame(this.updateAnimationState)
	}

	updateAnimationState() {
		const canvas = this.canvasRef.current,
			w = wRelToAbs(canvas)
		let {
			progress,
			adaptive,
			autoRepeat,
			workType,
			delayOnRepeat,
			residueDelOnRpt,
			colors,
			items,
			speedExhaustCloud,
			runwayType,
			planeScaleOnGroundKof,
			apexDot1,
			apexDot2,
			speedFlight,
			fireJetFlag,
			runWayK
		} = this.state

		let lengthExhaustCloud = canvas.width - 17
		// console.log('lengthExhaustCloud: ', lengthExhaustCloud)

		if (adaptive) this.resizeToParentSize(canvas)

		let realPlaneHeight = canvas.height * 0.9,
			realPlaneWidth = realPlaneHeight * 1.2

		progress = getProgress(canvas, progress, workType, realPlaneWidth)

		let { planeScale } = getPlaneScale(
			canvas,
			progress,
			apexDot1,
			apexDot2,
			planeScaleOnGroundKof
		),
			flyFlag = progress < canvas.width - realPlaneWidth

		clearCanvas(canvas)
		drawBackground(canvas, colors)
		if (progress < w(runWayK) || progress + realPlaneWidth > w(100 - runWayK))
			animatRunway(canvas, progress, runWayK, colors, runwayType)
		items = animatExhaustCloud(
			canvas,
			items,
			flyFlag,
			progress,
			speedExhaustCloud,
			lengthExhaustCloud,
			colors
		)
		if (flyFlag && fireJetFlag)
			drawFireJet(canvas, progress, colors, realPlaneHeight)
		drawPlane(canvas, planeScale, progress, colors.planeColor)

		let dotEndFly = getDotEndFly(canvas, workType, realPlaneWidth)
		progress =
			progress >= dotEndFly
				? progress
				: progress + (speedFlight * canvas.width) / 100

		if (autoRepeat && progress >= canvas.width - realPlaneWidth) {
			residueDelOnRpt--

			//плавное исчезание самолета и взлетной полосы
			colors.planeColor = addOpacityToColor(
				colors.planeColor,
				residueDelOnRpt / delayOnRepeat
			)
			colors.runwayColor = addOpacityToColor(
				colors.runwayColor,
				residueDelOnRpt / delayOnRepeat
			)

			if (residueDelOnRpt < 1) {
				residueDelOnRpt = delayOnRepeat
				progress = 0
				colors.planeColor = colors.planeColor.substring(0, 7)
				colors.runwayColor = colors.runwayColor.substring(0, 7)
			}
		}

		this.setState(prevState => ({
			...prevState,
			progress,
			residueDelOnRpt,
			colors,
			items
		}))
		this.rAF = requestAnimationFrame(this.updateAnimationState)
	}

	//делаем ресайз под родительский контейнер
	resizeToParentSize(canvas) {
		let parentNode = canvas.parentNode,
			width = parentNode.offsetWidth,
			height = parentNode.offsetHeight

		canvas.width = width
		canvas.height = height
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.rAF)
	}

	render() {
		return (
			<canvas
				ref={this.canvasRef}
				width={this.state.width}
				height={this.state.height}
			/>
		)
	}
}
CanvasAirplane.propTypes = {
	whSize: PropTypes.number,
	level: PropTypes.number,
	id: PropTypes.string,
	height: PropTypes.number,
	width: PropTypes.number,
	adaptive: PropTypes.bool,
	autoRepeat: PropTypes.bool,
	workType: PropTypes.number,
	delayOnRepeat: PropTypes.number,
	colors: PropTypes.object,
	speedExhaustCloud: PropTypes.number,
	lengthExhaustCloud: PropTypes.number,
	planeScaleOnGroundKof: PropTypes.number,
	apexDot1: PropTypes.number,
	apexDot2: PropTypes.number,
	speedFlight: PropTypes.number,
	runWayK: PropTypes.number,
	runwayType: PropTypes.number,
	fireJetFlag: PropTypes.bool
}

//функции преобразования из относительных (от длины/шрины) величин в абсолютные
const wRelToAbs = canvas => x => {
	const dotWidth = canvas.width / 100
	x = x * dotWidth
	return x
},
	hRelToAbs = canvas => y => {
		const dotHeight = canvas.height / 100
		y = y * dotHeight
		return y
	}

//отчистить холст
const clearCanvas = canvas => {
	const ctx = canvas.getContext('2d')
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

//рисуем фон
const drawBackground = (canvas, colors = {}) => {
	const ctx = canvas.getContext('2d')

	ctx.fillStyle = colors.backgroundColor
	ctx.fillRect(0, 0, canvas.width, canvas.height)
}

//рисуем самолет
const drawPlane = (canvas, planeScale, progress, color) => {
	const ctx = canvas.getContext('2d'),
		h = hRelToAbs(canvas)

	//самолет настройки
	const p1 = new Path2D(
		'M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z'
	),
		p = new Path2D(),
		m = document
			.createElementNS('http://www.w3.org/2000/svg', 'svg')
			.createSVGMatrix(),
		t = m.scale(planeScale)

	p.addPath(p1, t)

	ctx.save()
	ctx.translate(progress, h(50) - (planeScale * C.planeHeight) / 2)
	ctx.fillStyle = color
	ctx.fill(p)
	ctx.restore()
}

//рисуем огненный выхлап двигателя
const drawFireJet = (canvas, progress, colors, realPlaneHeight) => {
	//внешний
	let ellipseHeightWidth = 1 / 2,
		exEllipseHeight = 0.12 * realPlaneHeight,
		exEllipseWidth = exEllipseHeight / ellipseHeightWidth

	let gradient = createGradient(
		canvas,
		colors.plumeeExColors,
		-exEllipseWidth / 2,
		exEllipseWidth / 2
	)
	drawEllipse(canvas, progress, ellipseHeightWidth, exEllipseHeight, gradient)

	//внутрений
	ellipseHeightWidth = 2 / 7
	exEllipseHeight = 0.06 * realPlaneHeight
	exEllipseWidth = exEllipseHeight / ellipseHeightWidth

	gradient = createGradient(
		canvas,
		colors.plumeeInColors,
		-exEllipseWidth / 2,
		exEllipseWidth / 2
	)
	drawEllipse(canvas, progress, ellipseHeightWidth, exEllipseHeight, gradient)
}

//рисуем элипс
const drawEllipse = (
	canvas,
	progress,
	ellipseHeightWidth,
	exEllipseHeight,
	color
) => {
	const ctx = canvas.getContext('2d'),
		h = hRelToAbs(canvas)

	let exEllipseWidth = exEllipseHeight / ellipseHeightWidth

	ctx.save()
	ctx.beginPath()
	ctx.translate(progress - exEllipseWidth / 2, h(50) - exEllipseHeight / 10)
	ctx.scale(1, ellipseHeightWidth)
	ctx.arc(0, 0, exEllipseWidth, 0, Math.PI * 2, true)
	ctx.fillStyle = color
	ctx.closePath()
	ctx.fill()
	ctx.restore()
}

//создадим canvas gradient
const createGradient = (
	canvas,
	stopColors = [],
	startGradWidth = 0,
	stopGradWidth = 10
) => {
	const ctx = canvas.getContext('2d')

	let gradient = ctx.createLinearGradient(startGradWidth, 0, stopGradWidth, 0)
	stopColors.forEach(stopLevel => {
		gradient.addColorStop(stopLevel.level, stopLevel.color)
	})

	return gradient
}

//анимируем реактивный след
const animatExhaustCloud = (
	canvas,
	items = [],
	flyFlag,
	progress,
	speedFlight,
	lengthExhaustCloud,
	colors
) => {
	const h = hRelToAbs(canvas)

	let itemInitX = progress,
		itemInitY = h(50)

	items = createExhaustCloud(
		canvas,
		items,
		flyFlag,
		itemInitX,
		itemInitY,
		speedFlight,
		lengthExhaustCloud,
		colors.cloudColor
	)
	drawExhaustCloud(canvas, items)

	return items
}

//рисуем реактивный след
const drawExhaustCloud = (canvas, items) => {
	items.forEach(item => {
		drawExhaustItem(canvas, item)
	})
}

//создать реактивный след
const createExhaustCloud = (
	canvas,
	items = [],
	flyFlag = true,
	itemInitX,
	itemInitY,
	speedFlight,
	lengthExhaustCloud,
	cloudColor
) => {
	const h = hRelToAbs(canvas),
		valItemOnItr = 1,
		maxValItem = (60 * lengthExhaustCloud) / speedFlight,
		lengthItems = items.length,
		nextlengthItems = lengthItems + valItemOnItr,
		random = rand(0, valItemOnItr * 10),
		defaultSpeedX = flyFlag ? speedFlight : 0,
		defaultSpeedY = h(15),
		itemRadius = h(6)
	if (flyFlag)
		for (let i = lengthItems; i <= nextlengthItems; i++) {
			items[i] = createExhaustItem(
				{
					x: itemInitX,
					y: itemInitY,
					radius: itemRadius,
					color: cloudColor
				},
				defaultSpeedX,
				0
			)
		}

	if (nextlengthItems > maxValItem)
		items = items.slice(valItemOnItr + random, items.length)
	if (!flyFlag) items = items.slice(valItemOnItr * 2, items.length)
	items.map((item, index, array) => {
		let percent = (index - valItemOnItr) / array.length,
			speedY =
				index >= array.length * 0.9 && flyFlag ? 0 : defaultSpeedY * percent

		item.color = addOpacityToColor(item.color, percent - 0.05)
		return createExhaustItem(item, defaultSpeedX, speedY)
	})

	return items
}

//создать еденицу реактивного следа
const createExhaustItem = (item = {}, speedX = 5, speedY = 1) => {
	item.x = item.x || 5
	item.y = item.y || 5
	item.radius = item.radius || 4
	item.color = item.color || '#999999'
	speedX = speedX / 25
	speedY = speedY / 100

	item.x += -speedX
	item.y += rand(-speedY - 1, speedY)

	return item
}
//отрисовка еденицы реактивного следа
const drawExhaustItem = (canvas, item) => {
	const ctx = canvas.getContext('2d')

	ctx.beginPath()
	ctx.arc(
		item.x,
		item.y,
		item.radius < 0 ? 0 : item.radius,
		0,
		Math.PI * 2,
		false
	)
	ctx.fillStyle = item.color
	ctx.fill()
}

//анимируем взлетнопосадочную полосу
const animatRunway = (canvas, progress, runWayK, colors = {}, runwayType) => {
	const w = wRelToAbs(canvas),
		realPlaneWidth = canvas.height * 0.9 * 1.2,
		k0 = progress + realPlaneWidth - w(100 - runWayK),
		k1 = k0 / w(runWayK),
		offset =
			progress < w(runWayK)
				? (-w(100) * progress) / w(runWayK)
				: progress + realPlaneWidth - 1 > w(100 - runWayK)
					? w(100) * (1 - k1)
					: w(100)

	if (!(offset > w(100) || offset < -w(100)))
		drawRunway(canvas, offset, colors.runwayColor, runwayType)
}

//рисуем взлетнопосадочную полосу
const drawRunway = (canvas, offset, color, runwayType) => {
	const ctx = canvas.getContext('2d'),
		w = wRelToAbs(canvas),
		h = hRelToAbs(canvas),
		runwayWidth = h(5),
		rwDachSpac = w(3) > 7 ? w(5) : 7
	switch (runwayType) {
		case 0:
			ctx.save()
			ctx.translate(offset, 0)
			ctx.lineWidth = runwayWidth
			ctx.strokeStyle = color
			ctx.setLineDash([
				rwDachSpac,
				rwDachSpac
			]) /*dashes are 5px and spaces are 3px*/
			ctx.beginPath()
			ctx.moveTo(0, h(50))
			ctx.lineTo(w(100), h(50))
			ctx.stroke()
			ctx.restore()
			break
		default:
		case 1:
			ctx.save()
			ctx.translate(offset, 0)
			ctx.lineWidth = runwayWidth
			ctx.strokeStyle = color
			ctx.setLineDash([
				rwDachSpac,
				rwDachSpac
			]) /*dashes are 5px and spaces are 3px*/
			ctx.beginPath()
			ctx.moveTo(0, h(30))
			ctx.lineTo(w(100), h(30))
			ctx.moveTo(0, h(70))
			ctx.lineTo(w(100), h(70))
			ctx.stroke()
			ctx.restore()
			break
	}
}

//рандомное число
const rand = (a, b) => {
	return ~~(Math.random() * (b - a + 1) + a)
}

//добавить прозрачность к цвету в формате HEX
const addOpacityToColor = (color = '', percent = 1) => {
	percent = percent < 0 ? 0 : percent
	let stringOpacity = Math.round(percent * 255).toString(16)
	stringOpacity =
		'' + stringOpacity.length > 1 ? stringOpacity : '0' + stringOpacity
	color = color.substring(0, 7) + stringOpacity

	return color
}

const getProgress = (canvas, progress, workType) => {
	const realPlaneHeight = canvas.height * 0.9,
		realPlaneWidth = realPlaneHeight * 1.2
	switch (workType) {
		case C.wtFlyFromAToB:
			break
		case C.wtForeverFlyFromA:
			break
		case C.wtForeverFly:
		default:
			progress = canvas.width * 0.99 - realPlaneWidth
			break
	}
	return progress
}

const getDotEndFly = (canvas, workType, realPlaneWidth) => {
	let dotEndFly

	switch (workType) {
		case C.wtFlyFromAToB:
			dotEndFly = canvas.width - realPlaneWidth
			break
		case C.wtForeverFlyFromA:
			dotEndFly = canvas.width * 0.66 - realPlaneWidth
			break
		case C.wtForeverFly:
		default:
			dotEndFly = canvas.width * 0.99 - realPlaneWidth
			break
	}

	return dotEndFly
}

const getPlaneScale = (
	canvas,
	progress,
	apexDot1,
	apexDot2,
	planeScaleOnGroundKof
) => {
	//самолет настройки
	const w = wRelToAbs(canvas),
		realPlaneWidth = canvas.height * 0.9 * 1.2,
		defaultPlaneScale = (canvas.height / C.planeHeight) * 0.9, //коэфицент увеличение самолета по умолнию (в полете)
		planeScaleOnGround = defaultPlaneScale * planeScaleOnGroundKof

	let planeOnGroundFlag =
		progress < w(C.plnOnGndTime) ||
		progress + realPlaneWidth > w(100 - C.plnOnGndTime),
		planeOnUpFlag = progress < w(apexDot1),
		planeOnDownFlag = progress + realPlaneWidth > w(100 - apexDot2),
		kefOnUp =
			planeScaleOnGround +
			((defaultPlaneScale - planeScaleOnGround) *
				(progress - w(C.plnOnGndTime))) /
			w(apexDot1 - C.plnOnGndTime),
		kefUnDown =
			defaultPlaneScale -
			((defaultPlaneScale - planeScaleOnGround) *
				(progress + realPlaneWidth - w(100 - apexDot2))) /
			w(apexDot2 - C.plnOnGndTime),
		planeScale = planeOnGroundFlag
			? planeScaleOnGround
			: planeOnUpFlag
				? kefOnUp
				: planeOnDownFlag
					? kefUnDown
					: defaultPlaneScale

	return { planeScale }
}
//константы
const C = {
	wtForeverFly: 10,
	wtForeverFlyFromA: 11,
	wtFlyFromAToB: 20,
	planeHeight: 512, //высота самолета по дефолту (в path)
	plnOnGndTime: 3 //процент от общей длины, когда самолет 'на земле' при взлете и посадке
}
