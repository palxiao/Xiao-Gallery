const str2array = (str: string): any => {
    const values = str ? (str.match(/\${(\S+)}/g) || []) : []
    const keys = values.map(x => x.replace(/\$|{|}/g, ''))
    return { keys, values }
}

export default str2array
