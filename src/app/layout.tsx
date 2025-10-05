import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AuroraPulse",
  description: "Launch a bold, futuristic landing that introduces the crypto concept, explains how to buy, and presents tokenomics with a yellow theme."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} antialiased bg-gradient-to-br from-[#0A0A0A] to-[#111]`}>
        {children}
      
        {/* Visual Editor Script - Only runs in iframe */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  // Only run in iframe context
  if (window.self === window.top) return;
  
  // Check if already initialized
  if (window.__webildEditorInitialized) return;
  window.__webildEditorInitialized = true;

  console.log('[Webild Visual Editor] Script loaded, waiting for activation...');

  let isActive = false;
  let hoveredElement = null;
  let selectedElement = null;
  let originalContent = null;
  let isEditing = false;
  let listenersAttached = false;

  const textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li', 'div'];
  const invalidElements = ['html', 'body', 'script', 'style', 'meta', 'link', 'head'];
  const hoverClass = 'webild-hover';
  const selectedClass = 'webild-selected';

  // Add styles
  const style = document.createElement('style');
  style.id = 'webild-inspector-styles';
  style.textContent = `
    .webild-hover {
      outline: 2px dashed rgba(109, 51, 252, 0.6) !important;
      outline-offset: 2px !important;
      cursor: pointer !important;
    }
    .webild-selected {
      outline: 2px solid rgba(109, 51, 252, 0.9) !important;
      outline-offset: 2px !important;
    }
    [contenteditable="true"].webild-selected {
      outline: 2px solid rgba(59, 130, 246, 0.9) !important;
      background-color: rgba(59, 130, 246, 0.05) !important;
    }
  `;
  document.head.appendChild(style);

  const getUniqueSelector = (element) => {
    const path = [];
    let current = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.id) {
        selector = `#${current.id}`;
        path.unshift(selector);
        break;
      }
      
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(el => el.tagName === current.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1;
          selector += `:nth-of-type(${index})`;
        }
      }
      
      path.unshift(selector);
      current = parent;
      
      if (path.length >= 3) break;
    }
    
    return path.join(' > ');
  };
  
  const getElementInfo = (element) => {
    const rect = element.getBoundingClientRect();
    const tagName = element.tagName.toLowerCase();
    
    const selector = getUniqueSelector(element);
    
    const info = {
      tagName: tagName,
      id: element.id || undefined,
      className: element.className || undefined,
      selector: selector,
      boundingBox: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    };
    
    if (tagName === 'img') {
      info.imageData = {
        src: element.src,
        alt: element.alt || undefined,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight
      };
    }
    
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none') {
      const urlMatch = backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (urlMatch) {
        info.imageData = {
          src: urlMatch[1],
          isBackground: true
        };
      }
    }
    
    return info;
  };

  const isValidElement = (element) => {
    const tagName = element.tagName?.toLowerCase();
    return !invalidElements.includes(tagName);
  };

  const isTextElement = (element) => {
    const tagName = element.tagName.toLowerCase();
    if (!textElements.includes(tagName)) return false;
    
    if (tagName === 'div') {
      const hasElementChildren = Array.from(element.children).length > 0;
      if (hasElementChildren) return false;
    }
    
    return true;
  };

  const makeEditable = (element, clickEvent) => {
    if (!isTextElement(element)) return;
    
    originalContent = element.textContent;
    element.contentEditable = 'true';
    element.focus();
    isEditing = true;
    
    window.parent.postMessage({
      type: 'webild-text-editing-started',
      data: { selector: getElementInfo(element).selector }
    }, '*');
    
    const handleInput = () => {
      if (element.textContent !== originalContent) {
        window.parent.postMessage({
          type: 'webild-text-changed',
          data: { 
            selector: getElementInfo(element).selector,
            hasChanges: true
          }
        }, '*');
      }
    };
    
    element.addEventListener('input', handleInput);
    element.dataset.inputHandler = 'true';
    
    if (clickEvent && element.childNodes.length > 0) {
      const range = document.caretRangeFromPoint(clickEvent.clientX, clickEvent.clientY);
      if (range) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const makeUneditable = (element, save = false) => {
    if (!element || element.contentEditable !== 'true') return;
    
    element.contentEditable = 'false';
    isEditing = false;
    
    if (element.dataset.inputHandler === 'true') {
      element.removeEventListener('input', () => {});
      delete element.dataset.inputHandler;
    }
    
    window.parent.postMessage({
      type: 'webild-text-editing-ended',
      data: { selector: getElementInfo(element).selector }
    }, '*');
    
    if (save && originalContent !== element.textContent) {
      window.parent.postMessage({
        type: 'webild-element-changed',
        data: {
          type: 'updateText',
          selector: getElementInfo(element).selector,
          oldValue: originalContent,
          newValue: element.textContent
        }
      }, '*');
    } else if (!save && originalContent !== null) {
      element.textContent = originalContent;
    }
    
    originalContent = null;
  };

  let hoverOverlay = null;

  const createHoverOverlay = (element) => {
    const rect = element.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'webild-hover-overlay';
    overlay.style.cssText = `
      position: fixed !important;
      top: ${rect.top - 2}px !important;
      left: ${rect.left - 2}px !important;
      width: ${rect.width + 4}px !important;
      height: ${rect.height + 4}px !important;
      background-color: rgba(109, 51, 252, 0.25) !important;
      border-radius: 3px !important;
      pointer-events: none !important;
      z-index: 999998 !important;
    `;
    document.body.appendChild(overlay);
    return overlay;
  };

  const removeHoverOverlay = () => {
    if (hoverOverlay) {
      hoverOverlay.remove();
      hoverOverlay = null;
    }
  };

  const handleMouseOver = (e) => {
    if (!isActive) return;
    
    const target = e.target;
    
    if (!isValidElement(target) || target === hoveredElement || target === selectedElement) {
      return;
    }
    
    if (hoveredElement && hoveredElement !== selectedElement) {
      hoveredElement.classList.remove(hoverClass);
      if (hoveredElement.dataset.webildOriginalPosition) {
        hoveredElement.style.position = hoveredElement.dataset.webildOriginalPosition === 'none' ? '' : hoveredElement.dataset.webildOriginalPosition;
        delete hoveredElement.dataset.webildOriginalPosition;
      }
      removeHoverOverlay();
    }
    
    hoveredElement = target;
    
    const computedStyle = window.getComputedStyle(target);
    const currentPosition = computedStyle.position;
    
    if (currentPosition === 'static' || currentPosition === '') {
      hoveredElement.dataset.webildOriginalPosition = currentPosition || 'none';
      hoveredElement.style.position = 'relative';
    }
    
    hoveredElement.classList.add(hoverClass);
    
    if ((!selectedElement || selectedElement !== target) && !isScrolling) {
      hoverOverlay = createHoverOverlay(target);
    }
    
    window.parent.postMessage({
      type: 'webild-element-hover',
      data: getElementInfo(target)
    }, '*');
  };

  const handleMouseOut = (e) => {
    if (hoveredElement && hoveredElement !== selectedElement) {
      hoveredElement.classList.remove(hoverClass);
      
      if (hoveredElement.dataset.webildOriginalPosition) {
        hoveredElement.style.position = hoveredElement.dataset.webildOriginalPosition === 'none' ? '' : hoveredElement.dataset.webildOriginalPosition;
        delete hoveredElement.dataset.webildOriginalPosition;
      }
      
      removeHoverOverlay();
      
      hoveredElement = null;
      
      window.parent.postMessage({
        type: 'webild-element-hover',
        data: null
      }, '*');
    }
  };

  const handleClick = (e) => {
    if (!isActive) return;
    
    if (isEditing) {
      e.stopPropagation();
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target;
    
    if (!isValidElement(target)) return;
    
    if (selectedElement && selectedElement !== target) {
      makeUneditable(selectedElement, false);
      selectedElement.classList.remove(selectedClass);
      selectedElement.classList.remove(hoverClass);
      
      if (selectedElement.dataset.webildOriginalPosition) {
        selectedElement.style.position = selectedElement.dataset.webildOriginalPosition === 'none' ? '' : selectedElement.dataset.webildOriginalPosition;
        delete selectedElement.dataset.webildOriginalPosition;
      }
      
      removeHoverOverlay();
    }
    
    if (selectedElement === target) {
      if (target.dataset.webildOriginalPosition) {
        target.style.position = target.dataset.webildOriginalPosition === 'none' ? '' : target.dataset.webildOriginalPosition;
        delete target.dataset.webildOriginalPosition;
      }
      
      removeHoverOverlay();
      
      selectedElement = null;
      window.parent.postMessage({
        type: 'webild-element-selected',
        data: null
      }, '*');
      return;
    }
    
    selectedElement = target;
    selectedElement.classList.add(selectedClass);
    
    removeHoverOverlay();
    
    if (hoveredElement === target) {
      hoveredElement.classList.remove(hoverClass);
      hoveredElement = null;
    }
    
    window.parent.postMessage({
      type: 'webild-element-selected',
      data: getElementInfo(target)
    }, '*');
    
    if (isTextElement(target)) {
      setTimeout(() => makeEditable(target, e), 50);
    }
  };

  const handleKeyDown = (e) => {
    if (!isEditing || !selectedElement) return;
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      makeUneditable(selectedElement, true);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      makeUneditable(selectedElement, false);
    }
  };

  const handleBlur = (e) => {
    if (isEditing && selectedElement && e.target === selectedElement) {
      makeUneditable(selectedElement, true);
    }
  };

  let scrollTimeout = null;
  let isScrolling = false;
  
  const handleScroll = () => {
    removeHoverOverlay();
    isScrolling = true;
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      if (hoveredElement && (!selectedElement || selectedElement !== hoveredElement)) {
        hoverOverlay = createHoverOverlay(hoveredElement);
      }
    }, 150);
    
    window.parent.postMessage({
      type: 'webild-iframe-scroll'
    }, '*');
  };

  const handleMessage = (e) => {
    if (!e.data || !e.data.type) return;
    
    if (e.data.type === 'webild-activate-editor') {
      if (!isActive) {
        isActive = true;
        console.log('[Webild Visual Editor] Activated');
        window.parent.postMessage({ type: 'webild-editor-activated' }, '*');
      }
      return;
    }
    
    if (e.data.type === 'webild-deactivate-editor') {
      if (isActive) {
        isActive = false;
        // Clean up any active editing state
        if (selectedElement) {
          makeUneditable(selectedElement, false);
          selectedElement.classList.remove(selectedClass);
          selectedElement = null;
        }
        if (hoveredElement) {
          hoveredElement.classList.remove(hoverClass);
          hoveredElement = null;
        }
        removeHoverOverlay();
        console.log('[Webild Visual Editor] Deactivated');
        window.parent.postMessage({ type: 'webild-editor-deactivated' }, '*');
      }
      return;
    }
    
    if (e.data.type === 'webild-replace-image') {
      const { selector, newSrc, isBackground } = e.data.data;
      const element = document.querySelector(selector);
      
      if (element) {
        if (isBackground) {
          element.style.backgroundImage = `url('${newSrc}')`;
        } else if (element.tagName === 'IMG') {
          element.src = newSrc;
        }
        
        window.parent.postMessage({
          type: 'webild-image-replaced',
          data: { selector, newSrc }
        }, '*');
      }
    }
  };

  // Attach event listeners immediately (they check isActive flag)
  document.addEventListener('mouseover', handleMouseOver, true);
  document.addEventListener('mouseout', handleMouseOut, true);
  document.addEventListener('click', handleClick, true);
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('blur', handleBlur, true);
  window.addEventListener('scroll', handleScroll, true);
  window.addEventListener('message', handleMessage, true);

  window.webildCleanup = () => {
    isActive = false;
    
    if (selectedElement) {
      makeUneditable(selectedElement, false);
    }
    
    removeHoverOverlay();
    
    document.removeEventListener('mouseover', handleMouseOver, true);
    document.removeEventListener('mouseout', handleMouseOut, true);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('blur', handleBlur, true);
    window.removeEventListener('scroll', handleScroll, true);
    window.removeEventListener('message', handleMessage, true);
    
    document.querySelectorAll('.' + hoverClass).forEach(el => {
      el.classList.remove(hoverClass);
    });
    document.querySelectorAll('.' + selectedClass).forEach(el => {
      el.classList.remove(selectedClass);
    });
    
    const styleEl = document.getElementById('webild-inspector-styles');
    if (styleEl) styleEl.remove();
    
    hoveredElement = null;
    selectedElement = null;
  };

  // Send ready signal to parent
  window.parent.postMessage({ type: 'webild-editor-ready' }, '*');
  console.log('[Webild Visual Editor] Ready and waiting for activation');
})();
`,
          }}
        />
</body>
    </html>
  );
}
