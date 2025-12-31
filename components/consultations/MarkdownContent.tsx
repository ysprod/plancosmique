import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { memo, useMemo } from 'react';
import { Sparkles, Star, CheckCircle2 } from 'lucide-react';

interface MarkdownContentProps {
	content: string;
}

const MarkdownContent = memo<MarkdownContentProps>(({ content }) => {
	const markdownComponents = useMemo(() => ({
		h1: ({ ...props }: any) => (
			<h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3" {...props}>
				<Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-300 flex-shrink-0" />
				<span>{props.children}</span>
			</h1>
		),
		h2: ({ ...props }: any) => (
			<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center gap-2" {...props}>
				<Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 flex-shrink-0" />
				<span>{props.children}</span>
			</h2>
		),
		h3: ({ ...props }: any) => (
			<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-200 mt-5 sm:mt-6 mb-3" {...props} />
		),
		p: ({ ...props }: any) => (
			<p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4" {...props} />
		),
		ul: ({ ...props }: any) => (
			<ul className="space-y-2 sm:space-y-3 mb-4" {...props} />
		),
		ol: ({ ...props }: any) => (
			<ol className="space-y-2 sm:space-y-3 mb-4 list-decimal list-inside" {...props} />
		),
		li: ({ ...props }: any) => (
			<li className="text-sm sm:text-base text-white/90 flex items-start gap-2 sm:gap-3" {...props}>
				<CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0 mt-0.5" />
				<span className="flex-1">{props.children}</span>
			</li>
		),
		strong: ({ ...props }: any) => (
			<strong className="text-amber-300 font-bold" {...props} />
		),
		em: ({ ...props }: any) => (
			<em className="text-purple-300" {...props} />
		),
		blockquote: ({ ...props }: any) => (
			<blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-500/10 rounded-r-lg text-sm sm:text-base" {...props} />
		),
		hr: ({ ...props }: any) => (
			<hr className="my-6 sm:my-8 border-white/20" {...props} />
		),
		code: ({ inline, ...props }: any) =>
			inline ? (
				<code className="bg-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-purple-300 text-xs sm:text-sm" {...props} />
			) : (
				<code className="block bg-white/10 p-3 sm:p-4 rounded-lg text-purple-300 text-xs sm:text-sm overflow-x-auto" {...props} />
			)
	}), []);

	return (
		<div className="markdown-content prose prose-invert max-w-none">
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
				{content}
			</ReactMarkdown>
		</div>
	);
});
export default MarkdownContent;
