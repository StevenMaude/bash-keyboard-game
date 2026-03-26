import { describe, it, expect } from 'vitest'
import { applyReadlineShortcut } from '../readlineShortcuts.js'

describe('readline shortcuts', () => {
  it('handles Ctrl+A and Ctrl+E cursor movement', () => {
    const toStart = applyReadlineShortcut({
      value: 'echo hello world',
      selectionStart: 6,
      selectionEnd: 6,
      key: 'a',
      ctrlKey: true,
      altKey: false,
      metaKey: false
    })

    expect(toStart.selectionStart).toBe(0)

    const toEnd = applyReadlineShortcut({
      value: 'echo hello world',
      selectionStart: 2,
      selectionEnd: 2,
      key: 'e',
      ctrlKey: true,
      altKey: false,
      metaKey: false
    })

    expect(toEnd.selectionStart).toBe(16)
  })

  it('handles Alt+B and Alt+F by words', () => {
    const backward = applyReadlineShortcut({
      value: 'git commit --amend',
      selectionStart: 17,
      selectionEnd: 17,
      key: 'b',
      ctrlKey: false,
      altKey: true,
      metaKey: false
    })

    expect(backward.selectionStart).toBe(11)

    const forward = applyReadlineShortcut({
      value: 'git commit --amend',
      selectionStart: 0,
      selectionEnd: 0,
      key: 'f',
      ctrlKey: false,
      altKey: true,
      metaKey: false
    })

    expect(forward.selectionStart).toBe(3)
  })

  it('handles kill shortcuts Ctrl+W, Ctrl+U and Ctrl+K', () => {
    const cutWord = applyReadlineShortcut({
      value: 'npm run test -- --watch',
      selectionStart: 12,
      selectionEnd: 12,
      key: 'w',
      ctrlKey: true,
      altKey: false,
      metaKey: false
    })

    expect(cutWord.value).toBe('npm run -- --watch')

    const cutToStart = applyReadlineShortcut({
      value: 'abcdef',
      selectionStart: 4,
      selectionEnd: 4,
      key: 'u',
      ctrlKey: true,
      altKey: false,
      metaKey: false
    })

    expect(cutToStart.value).toBe('ef')

    const cutToEnd = applyReadlineShortcut({
      value: 'abcdef',
      selectionStart: 2,
      selectionEnd: 2,
      key: 'k',
      ctrlKey: true,
      altKey: false,
      metaKey: false
    })

    expect(cutToEnd.value).toBe('ab')
  })
})
