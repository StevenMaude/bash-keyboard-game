function isWordChar(char) {
  return char !== ' ' && char !== '\t' && char !== '\n'
}

function moveWordLeft(text, cursor) {
  let i = cursor
  while (i > 0 && !isWordChar(text[i - 1])) {
    i -= 1
  }
  while (i > 0 && isWordChar(text[i - 1])) {
    i -= 1
  }
  return i
}

function moveWordRight(text, cursor) {
  let i = cursor
  while (i < text.length && !isWordChar(text[i])) {
    i += 1
  }
  while (i < text.length && isWordChar(text[i])) {
    i += 1
  }
  return i
}

export function applyReadlineShortcut({ value, selectionStart, selectionEnd, key, ctrlKey, altKey, metaKey }) {
  if (metaKey) {
    return null
  }

  let nextStart = selectionStart
  let nextEnd = selectionEnd
  let nextValue = value

  if (ctrlKey && !altKey) {
    switch (key.toLowerCase()) {
      case 'a':
        nextStart = 0
        nextEnd = 0
        break
      case 'e':
        nextStart = value.length
        nextEnd = value.length
        break
      case 'b':
        nextStart = Math.max(0, selectionStart - 1)
        nextEnd = nextStart
        break
      case 'f':
        nextStart = Math.min(value.length, selectionEnd + 1)
        nextEnd = nextStart
        break
      case 'u':
        nextValue = value.slice(selectionEnd)
        nextStart = 0
        nextEnd = 0
        break
      case 'k':
        nextValue = value.slice(0, selectionStart)
        nextStart = selectionStart
        nextEnd = selectionStart
        break
      case 'w': {
        const wordStart = moveWordLeft(value, selectionStart)
        const prefix = value.slice(0, wordStart)
        let suffix = value.slice(selectionEnd)
        if (/\s$/.test(prefix) && /^\s/.test(suffix)) {
          suffix = suffix.replace(/^\s+/, '')
        }
        nextValue = prefix + suffix
        nextStart = wordStart
        nextEnd = wordStart
        break
      }
      default:
        return null
    }

    return {
      value: nextValue,
      selectionStart: nextStart,
      selectionEnd: nextEnd
    }
  }

  if (altKey && !ctrlKey) {
    switch (key.toLowerCase()) {
      case 'b':
        nextStart = moveWordLeft(value, selectionStart)
        nextEnd = nextStart
        break
      case 'f':
        nextStart = moveWordRight(value, selectionEnd)
        nextEnd = nextStart
        break
      default:
        return null
    }

    return {
      value: nextValue,
      selectionStart: nextStart,
      selectionEnd: nextEnd
    }
  }

  return null
}
