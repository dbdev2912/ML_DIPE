export default {
    css: [
        { id: 0, prop: "color",             label: "Màu chữ", inputType: "color", defaultValue: "#000" },
        { id: 0, prop: "backgroundColor",   label: "Màu nền", inputType: "color", defaultValue: "#fff" },
        { id: 1, prop: "width",             label: "Độ rộng", inputType: "text", defaultValue: "100%" },
        { id: 23, prop: "maxWidth",         label: "Độ rộng tối đa", inputType: "text"},
        { id: 21, prop: "height",           label: "Chiều cao", inputType: "text", defaultValue: "100px" },
        { id: 22, prop: "maxHeight",        label: "Chiều cao tối đa", inputType: "text"},
        { id: 2, prop: "display",           label: "Dạng khối", inputType: "dropbox", defaultValue: "block", values: [ "block", "flex", "inline", "inline-block", "table-cell" ] },
        { id: 4, prop: "margin",            label: "Lề", inputType: "text", defaultValue: "0",
        children: [
            { id: 8, prop: "marginLeft",    label: "Lề trái", inputType: "text", defaultValue: "0" },
            { id: 6, prop: "marginRight",   label: "Lề phải", inputType: "text", defaultValue: "0" },
            { id: 5, prop: "marginTop",     label: "Lề trên", inputType: "text", defaultValue: "0" },
            { id: 7, prop: "marginBottom",  label: "Lề dưới", inputType: "text", defaultValue: "0" },
        ]},

        { id: 9, prop: "padding",  label: "Lề trong", inputType: "text", defaultValue: "0", children: [
            { id: 10, prop: "paddingTop",       label: "Lề trong bên trên", inputType: "text", defaultValue: "0" },
            { id: 12, prop: "paddingBottom",    label: "Lề trong bên dưới", inputType: "text", defaultValue: "0" },
            { id: 13, prop: "paddingLeft",      label: "Lề trong bên trái", inputType: "text", defaultValue: "0" },
            { id: 11, prop: "paddingRight",     label: "Lề trong bên phải", inputType: "text", defaultValue: "0" },
        ]},

        { id: 15, prop: "borderWidth", label: "Kích cở viền", inputType: "text", defaultValue: "0" },
        { id: 16, prop: "borderColor", label: "Màu viền", inputType: "color", defaultValue: "#000" },
        { id: 14, prop: "borderStyle", label: "Kiểu viền", inputType: "dropbox", defaultValue: "none", values: [ "none","solid","dashed","dotted" ] ,
        children: [
            { id: 17, prop: "borderTopStyle",       label: "Viền trên", inputType: "dropbox", defaultValue: "none", values: [ "none","solid","dashed","dotted" ] },
            { id: 19, prop: "borderBottomStyle",    label: "Viền dưới", inputType: "dropbox", defaultValue: "none", values: [ "none","solid","dashed","dotted" ] },
            { id: 20, prop: "borderLeftStyle",      label: "Viền trái", inputType: "dropbox", defaultValue: "none", values: [ "none","solid","dashed","dotted" ] },
            { id: 18, prop: "borderRightStyle",     label: "Viền phải", inputType: "dropbox", defaultValue: "none", values: [ "none","solid","dashed","dotted" ] },
        ]},

        { id: 29, prop: "fontStyle",  label: "Kiểu chữ", inputType: "dropbox", defaultValue: "normal", values: [ "normal","italic","oblique" ] },
        { id: 30, prop: "fontWeight", label: "In đậm", inputType: "dropbox", defaultValue: "normal", values: [ "normal","bold"] },
        { id: 32, prop: "fontSize",   label: "Cở chữ", inputType: "text", defaultValue: "16px" },
        { id: 35, prop: "textAlign", label: "Căn lề", inputType: "dropbox", defaultValue: "left", values: [ "left", "right","center","justify" ] },

        { id: 36, prop: "position",  label: "Vị trí tương đối", inputType: "dropbox", defaultValue: "static", values: [ "static", "relative","fixed","absolute","sticky" ] ,
        children: [
            { id: 38, prop: "top",  label: "Trên", inputType: "text", defaultValue: "0"},
            { id: 39, prop: "bottom", label: "Dưới", inputType: "text", defaultValue: "0" },
            { id: 40, prop: "left", label: "Trái", inputType: "text", defaultValue: "0" },
            { id: 41, prop: "right", label: "Phải", inputType: "text", defaultValue: "0" },
        ]},
        { id: 37, prop: "zIndex", label: "Xếp lớp", inputType: "text", defaultValue: "1"},

        { id: 42, prop: "overflow", label: "Cuộn", inputType: "dropbox", defaultValue: "visible", values: [ "visible ", "hidden ","scroll ","auto " ]},
        { id: 43, prop: "opacity", label: "Độ nhạt nhòa", inputType: "text", defaultValue:  "1"},
        { id: 44, prop: "borderRadius", label: "Miết góc", inputType: "text", defaultValue: "0" },
    ]
}
