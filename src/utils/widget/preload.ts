export default class PreLoad {
    private i: number;
    private arr: string[];
    constructor(arr: string[]) {
        this.i = 0
        this.arr = arr
    }
    public imgs(cb: (n: number) => void) {
        return new Promise(resolve => {
            const work = () => {
                if (this.i < this.arr.length) {
                    const img = new Image()
                    img.src = this.arr[this.i]
                    if (img.complete) {
                        this.i++
                        work()
                    } else {
                        img.onload = () => {
                            cb(((this.i + 1) / this.arr.length) * 100) // 进度反馈
                            this.i++
                            work()
                            img.onload = null
                        };
                    }
                } else {
                    resolve()
                }
            }
            work()
        })
    }
}
