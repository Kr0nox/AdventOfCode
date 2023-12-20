function parseNumberList(input: string, seperator: string|RegExp = /,| /g) {
  return input.split(seperator).filter(s => s != '').map(i => parseInt(i.trim()))
}

export { parseNumberList }