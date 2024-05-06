import { create } from 'zustand'


interface LogStyleActionsType {
  updateContent: (content: string) => void
  updateBorder: (border: typeof initialState.border) => void
  updateBackground: (background: typeof initialState.background) => void
  updateText: (text: typeof initialState.text) => void
  updateBox: (box: typeof initialState.box) => void
  getCssStyle: () => ({
    "color": string,
    "font-size": string,
    "font-weight": string,
    "font-style": string,
    "text-decoration": string,
    "font-family": string,
    "text-shadow": string,
    "border-top": string,
    "border-right": string,
    "border-bottom": string,
    "border-left": string,
    "border-radius": string,
    "background-color": string,
    "background-image": string,
    "margin-top": string,
    "margin-right": string,
    "margin-bottom": string,
    "margin-left": string,
    "padding-top": string,
    "padding-right": string,
    "padding-bottom": string,
    "padding-left": string,
  })
  getConsoleLog: () => string
}

const initialState = {
  content: "Hello World !",
  border: {
    top: {
      color: "",
      style: "",
      size: "",
      radius: "",
    },
    right: {
      color: "",
      style: "",
      size: "",
      radius: "",
    },
    bottom: {
      color: "",
      style: "",
      size: "",
      radius: "",
    },
    left: {
      color: "",
      style: "",
      size: "",
      radius: "",
    },
  },
  background: {
    color: "",
    gradient: {
      type: "none",
      direction: "",
      colors: [["", ""], ["", "100%"]]
    }
  },
  text: {
    color: "",
    size: "",
    weight: "",
    style: "",
    decoration: "",
    family: "",
    transform: "",
    shadow: [{
      color: "",
      x: "",
      y: "",
      blur: "",
    }],
  },
  box: {
    margin: {
      top: "",
      right: "",
      bottom: "",
      left: "",
    },
    padding: {
      top: "",
      right: "",
      bottom: "",
      left: "",
    }
  }
}

export const useLogState = create<typeof initialState & LogStyleActionsType>()((set, get) => ({
  ...initialState,
  updateContent: (content: string) => set({ content }),
  updateBorder: (border: typeof initialState.border) => set({ border }),
  updateBackground: (background: typeof initialState.background) => set({ background }),
  updateText: (text: typeof initialState.text) => set({ text }),
  updateBox: (box: typeof initialState.box) => set({ box }),
  getCssStyle: () => {
    const { text, border, background, box } = get()
    return (
      {
        "color": `${text.color}`,
        "font-size": `${text.size}`,
        "font-weight": `${text.weight}`,
        "font-style": `${text.style}`,
        "text-decoration": `${text.decoration}`,
        "text-transform": `${text.transform}`,
        "font-family": `${text.family}`,
        "text-shadow": `${text.shadow.map(({ color, x, y, blur }) => `${x} ${y} ${blur} ${color}`).join(", ")}`,
        "border-top": `${border.top.size} ${border.top.style} ${border.top.color}`,
        "border-right": `${border.right.size} ${border.right.style} ${border.right.color}`,
        "border-bottom": `${border.bottom.size} ${border.bottom.style} ${border.bottom.color}`,
        "border-left": `${border.left.size} ${border.left.style} ${border.left.color}`,
        "border-radius": `${border.top.radius} ${border.right.radius} ${border.bottom.radius} ${border.left.radius}`,
        "background-color": `${background.color}`,
        "background-image": `${background.gradient.type}(${background.gradient.direction === "0deg" ? "" : background.gradient.direction} ${background.gradient.colors.length === 0 ? "" : background.gradient.colors.map(([color, position]) => `${color} ${position}`).join(", ")})`,
        "margin-top": `${box.margin.top}`,
        "margin-right": `${box.margin.right}`,
        "margin-bottom": `${box.margin.bottom}`,
        "margin-left": `${box.margin.left}`,
        "padding-top": `${box.padding.top}`,
        "padding-right": `${box.padding.right}`,
        "padding-bottom": `${box.padding.bottom}`,
        "padding-left": `${box.padding.left}`,
      })
  },
  getConsoleLog: () => {
    const { content } = get()
    const cssStyle = get().getCssStyle()
    const log = Object.entries(cssStyle).reduce((acc, [key, value]) => {
      if (value.trim() !== "" && value.trim() !== "0px" && !value.trim().includes("none")) {
        acc[key] = value.trim()
      }
      return acc
    }, {} as Record<string, string>)
    let stringifiedLog = ""
    Object.entries(log).map(([key, value]) => {
      stringifiedLog += `${key}: ${value};`
    })
    return `console.log("%c${content}", "${Object.keys(log).length === 0 ? "" : stringifiedLog}")`

  }
}))

