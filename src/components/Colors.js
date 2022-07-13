const colors = {
    main_color: "#66c7db",
    main_color_dark: "#1a8a98",
    text_color:"white",
    text_color_with_bg:"white",
}

function get_color(name) {
    if (name in colors) {
        return colors[name]
    }
    else {
        return "black"
    }
}

export default get_color;