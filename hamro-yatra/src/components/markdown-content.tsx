"use client";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  // Simple markdown to HTML conversion matching Scorpio page styling
  const renderMarkdown = (text: string) => {
    let html = text;

    // Links FIRST - [text](url) - process before bold to avoid conflicts
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange-600 hover:text-orange-700 font-semibold underline decoration-2 underline-offset-2 transition-colors">$1</a>');

    // Headers - matching Scorpio page sizes with responsive text
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base sm:text-lg font-bold text-gray-900 mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg sm:text-xl font-bold text-gray-900 mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-6">$1</h1>');

    // Bold - but don't affect links
    html = html.replace(/\*\*((?:(?!\*\*).)+)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');

    // Lists - Process line by line with Scorpio styling
    const lines = html.split('\n');
    const processed: string[] = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if it's a list item
      if (line.match(/^[\-•✓] /)) {
        if (!inList) {
          processed.push('<ul class="space-y-3 mb-6">');
          inList = true;
        }
        
        if (line.startsWith('✓ ')) {
          const text = line.substring(2);
          processed.push(`<li class="flex items-start gap-2 sm:gap-3"><span class="text-green-600 font-bold shrink-0 mt-1">✓</span><span class="text-base sm:text-lg text-gray-700">${text}</span></li>`);
        } else {
          const text = line.substring(2);
          processed.push(`<li class="flex items-start gap-2 sm:gap-3"><span class="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-2.5"></span><span class="text-base sm:text-lg text-gray-700">${text}</span></li>`);
        }
      } else {
        // Not a list item
        if (inList) {
          processed.push('</ul>');
          inList = false;
        }
        
        // Don't wrap if it's already HTML or empty
        if (line.startsWith('<') || line.trim() === '') {
          processed.push(line);
        } else if (!line.startsWith('#')) {
          // Regular paragraph - responsive text with proper wrapping
          processed.push(`<p class="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 break-words">${line}</p>`);
        } else {
          processed.push(line);
        }
      }
    }
    
    // Close list if still open
    if (inList) {
      processed.push('</ul>');
    }

    return processed.join('\n');
  };

  return (
    <div
      className={`prose prose-gray max-w-none space-y-4 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
