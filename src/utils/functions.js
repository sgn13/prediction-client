export const queryMaker = query => {
  const querys = Object.entries(query || {}).reduce(
    (acc, [key, value], index) => {
      if (Array.isArray(value)) {
        const subQuery = value.reduce((acc, curr) => {
          return (acc = acc + `${key}=${curr}&`)
        }, "")
        acc += `${subQuery}`
      } else if (typeof value === "object") {
        if (value?.queryMethod === "JSON") {
          const objValue = { ...(value || {}) }
          delete objValue.queryMethod
          if (Object.keys(objValue)?.length) {
            acc += `${key}=${JSON.stringify(objValue)}&`
          }
        }
      } else {
        acc +=
          key === "filterQuery"
            ? !value?.length
              ? ""
              : `${value}`
            : `${key}=${value}&`
      }

      return acc
    },
    ""
  )
  return querys
}
