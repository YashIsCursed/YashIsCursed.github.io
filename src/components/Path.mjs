export class Path{
    Path() {
        return (window.location.pathname)
    }
    equals(path) {
        return (this.Path() === path)
    }

}