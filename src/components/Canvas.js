import { useCallback, useEffect, useRef, useState } from 'react'
import { IntersectionPoint, Line } from '../BLL/BLL';



let A, B, C;

function EquationOfTheLine(x1, y1, x2, y2) { //построение уравнения прямой Ax+By+C
    A = y2 - y1
    B = x1 - x2
    C = -x1 * (y2 - y1) + y1 * (x2 - x1)
}

let pointxx;
let pointyy;


function IntersectionX(a1, b1, c1, a2, b2, c2)// поиск точки пересечения по Х
{
    let d, dx, pointx;
    d = a1 * b2 - b1 * a2;
    dx = -c1 * b2 + b1 * c2;
    pointx = dx / d;
    return pointx;
}

function IntersectionY(a1, b1, c1, a2, b2, c2) //поиск точки пересечения по Y
{
    let d, dy, pointy;
    d = a1 * b2 - b1 * a2;
    dy = -a1 * c2 + c1 * a2;
    pointy = dy / d;
    return pointy;
}


const lineSegmentsIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    var a_dx = x2 - x1;
    var a_dy = y2 - y1;
    var b_dx = x4 - x3;
    var b_dy = y4 - y3;
    var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
    let n;
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}


export const Canvas = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [firstPointX, setFirstPointX] = useState(null)
    const [firstPointY, setFirstPointY] = useState(null)
    const [creatingLine, setCreatingLine] = useState(null)
    const [lines, setLines] = useState([])
    const [points, setPoints] = useState([])
    const [creatingPoints, setCreatingPoints] = useState([])


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const context = canvas.getContext('2d')
        context.scale(2, 2)
        context.strokeStyle = 'black';
        context.lineWidth = 1
        contextRef.current = context;
    }, [])

    const drawingCanceling = () => {
        setCreatingLine(null)
        setIsDrawing(false)
    }


    const mauseClickHandler = ({ nativeEvent }) => {
        if (nativeEvent.button == 2 && creatingLine) {
            drawingCanceling()
        } else if (nativeEvent.button == 0) {
            setIsDrawing(!isDrawing);
            const { offsetX, offsetY } = nativeEvent;
            if (!firstPointX && !firstPointY) {
                setFirstPointX(offsetX)
                setFirstPointY(offsetY)
            }
        }
    }




    useEffect(() => {
        if (!isDrawing && creatingLine) {
            setLines([...lines, creatingLine])
            setPoints([...points, ...creatingPoints])
            setCreatingPoints([])
            setCreatingLine(null)
            setFirstPointX(null)
            setFirstPointY(null)
        }
        else if (!isDrawing && creatingLine == null) {
            setFirstPointX(null)
            setFirstPointY(null)
        }

    }, [isDrawing, creatingLine])
    useEffect(() => {
        if (lines) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d")
            context.fillStyle = "white"
            context.fillRect(0, 0, canvas.width, canvas.height)
            lines.forEach(line => line.drawLine(contextRef))
        }
        if (points) {
            points.forEach(p => p.drawPoint(contextRef))
        }
    }, [lines, creatingLine])

    useEffect(() => {
        console.log(creatingPoints);
        if (creatingPoints !== [])
            creatingPoints.forEach(p => p.drawPoint(contextRef))
    }, [creatingPoints, creatingLine])


    let intersectionHandler = (creatingLine, l) => {
        let x = lineSegmentsIntersect(creatingLine.x1, creatingLine.y1, creatingLine.x2, creatingLine.y2, l.x1, l.y1, l.x2, l.y2)
        if (x) {
            var a1, b1, c1, a2, b2, c2;
            EquationOfTheLine(creatingLine.x1, creatingLine.y1, creatingLine.x2, creatingLine.y2);
            a1 = A; b1 = B; c1 = C;
            EquationOfTheLine(l.x1, l.y1, l.x2, l.y2)
            a2 = A; b2 = B; c2 = C;
            pointxx = IntersectionX(a1, b1, c1, a2, b2, c2);
            pointyy = IntersectionY(a1, b1, c1, a2, b2, c2);
            let point = new IntersectionPoint(pointxx, pointyy);
            if (point !== null) {
                setCreatingPoints([...creatingPoints, point]);

            }
        }
    }



    const onLinesInersiction = useCallback(
        () => {  
            if (lines && creatingLine) {
                lines.forEach(l => intersectionHandler(creatingLine, l))
            }
        },
        [creatingLine],
    );

  



    const drawingLine = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }
        const { offsetX, offsetY } = nativeEvent;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
        setCreatingPoints([])
        setCreatingLine(new Line(firstPointX, firstPointY, offsetX, offsetY))
        onLinesInersiction()
    }

    useEffect(() => {
        if (!creatingLine) {
            return
        } else
           setCreatingPoints([])

            creatingLine.drawLine(contextRef);
            onLinesInersiction()

    }, [creatingLine])


    return (
        <canvas className='canvas'
            onMouseDown={mauseClickHandler}
            onMouseMove={drawingLine}
            ref={canvasRef}
        />


    )
}