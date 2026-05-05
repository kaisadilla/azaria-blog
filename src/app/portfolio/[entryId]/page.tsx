import { PortfolioEntryAttributes } from '@/api/PortfolioEntry';
import Type from '@/app/blog/e/[entryId]/.components/Type';
import CodeBlock from '@/app/blog/e/[entryId]/CodeBlock';
import InlineCode from '@/app/blog/e/[entryId]/InlineCode';
import BlogCode from '@/components/BlogCode';
import BlogPre from '@/components/BlogPre';
import Clock from '@/components/Clock';
import GlitchText from '@/components/GlitchText';
import Video from '@/components/markdown/Video';
import WIcon from '@/components/WIcon';
import fm, { FrontMatterResult } from 'front-matter';
import fs from 'fs/promises';
import { MDXRemote } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import rehypeSlug from 'rehype-slug';
import NoProjectShowcase from '../NoProjectShowcase';
import EntryContainer from './EntryContainer';
import styles from './page.module.scss';

export interface Props {
  params: {
    entryId: string;
  };
}

async function EntryPage ({ params }: Props) {
  const { entryId } = params;

  const entry = await fetchFile(entryId);

  if (!entry) return (
    <NoProjectShowcase message="404 — Not found" />
  );

  const headings = entry.body.match(/^#+.*/gm)?.map(h => h.substring(2)) ?? [];

  const components = {
    h1: BlogH1,
    code: BlogCode,
    pre: BlogPre,
    //aside: Aside,
    //Aside,
    InlineCode,
    CodeBlock,
    WIcon,
    Clock,
    Type,
    Video,
  };

  return (
    <EntryContainer>
      <MDXRemote
        source={entry.body}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              //rehypeSanitize, // TODO: Reimplement
              rehypeMdxCodeProps,
            ]
          }
        }}
      />
    </EntryContainer>
  );
}

async function fetchFile (
  entryId: string
) : Promise<FrontMatterResult<PortfolioEntryAttributes> | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'static', 'portfolio', `${entryId}.md`)
    const file = await fs.readFile(filePath, 'utf-8')
    return fm<PortfolioEntryAttributes>(file)
  } catch {
    return null
  }
}

function BlogH1 (
  {id, ...headingProps}: React.HTMLAttributes<HTMLHeadingElement>
) {
  return (
    <GlitchText
      className={styles.h1}
      text={headingProps.children as string}
    />
  );
}


export default EntryPage;
