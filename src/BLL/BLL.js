export class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    drawLine(contextRef) {
        contextRef.current.beginPath()
        contextRef.current.moveTo(this.x1, this.y1);
        contextRef.current.lineTo(this.x2, this.y2);
        contextRef.current.stroke()
    }


}

export class IntersectionPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawPoint(contextRef) {
        contextRef.current.beginPath();
        contextRef.current.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        contextRef.current.fillStyle = 'red';
        contextRef.current.fill();
        contextRef.current.lineWidth = 1;
        contextRef.current.strokeStyle = 'black';
        contextRef.current.stroke();
    }
}



/*
let A, B, C;
export class MathLogic {

    equationOfTheLine = (x1, y1, x2, y2) => { //построение уравнения прямой Ax+By+C
        A = y2 - y1
        B = x1 - x2
        C = -x1 * (y2 - y1) + y1 * (x2 - x1)
    }

    intersectionX = (a1, b1, c1, a2, b2, c2) => // поиск точки пересечения по Х
    {
        var d, dx, pointx;
        d = a1 * b2 - b1 * a2;
        dx = -c1 * b2 + b1 * c2;
        pointx = dx / d;
        return pointx;
    }

    intersectionY = (a1, b1, c1, a2, b2, c2) => //поиск точки пересечения по Y
    {
        var d, dy, pointy;
        d = a1 * b2 - b1 * a2;
        dy = -a1 * c2 + c1 * a2;
        pointy = dy / d;
        return pointy;
    }





}



var a1, b1, c1, a2, b2, c2;
EquationOfTheLine(creatingLine.x1, creatingLine.y1, creatingLine.x2, creatingLine.y2);
a1 = A; b1 = B; c1 = C;
EquationOfTheLine(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2)
a2 = A; b2 = B; c2 = C;
pointxx = IntersectionX(a1, b1, c1, a2, b2, c2);
pointyy = IntersectionY(a1, b1, c1, a2, b2, c2);



function EquationOfTheLine(x1, y1, x2, y2) { //построение уравнения прямой Ax+By+C
    A = y2 - y1
    B = x1 - x2
    C = -x1 * (y2 - y1) + y1 * (x2 - x1)
}



function IntersectionX(a1, b1, c1, a2, b2, c2)// поиск точки пересечения по Х
{
    var d, dx, pointx;
    d = a1 * b2 - b1 * a2;
    dx = -c1 * b2 + b1 * c2;
    pointx = dx / d;
    return pointx;
}

function IntersectionY(a1, b1, c1, a2, b2, c2) //поиск точки пересечения по Y
{
    var d, dy, pointy;
    d = a1 * b2 - b1 * a2;
    dy = -a1 * c2 + c1 * a2;
    pointy = dy / d;
    return pointy;
}
*/