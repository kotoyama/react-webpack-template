export async function loadPolyfills() {
  if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothscroll = await import('smoothscroll-polyfill')
    smoothscroll.polyfill()
  }
}
