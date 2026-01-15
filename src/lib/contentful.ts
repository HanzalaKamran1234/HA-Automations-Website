import { createClient } from 'contentful';
import type { Entry, EntrySkeletonType } from 'contentful';

export const contentfulClient = createClient({
    space: 'qc084p3r3k7g',
    accessToken: 'uvAYtoEkeN1DBRILg-PgHzS3XaGAJrYZeyJpkQxMHu8',
});

export interface BlogPostSkeleton extends EntrySkeletonType {
    contentTypeId: 'blogPost';
    fields: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        date: string;
        category: string;
        readTime: string;
        coverImage?: {
            fields: {
                file: {
                    url: string;
                };
            };
        };
    };
}

// Export the Entry type for use in components
export type BlogPost = Entry<BlogPostSkeleton, undefined, string>;

export async function getBlogPosts(): Promise<BlogPost[]> {
    // Removed early return to allow error to propagate if credentials are missing
    const entries = await contentfulClient.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost',
    });
    return entries.items;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
    if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID) {
        return undefined;
    }
    const entries = await contentfulClient.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
    } as any);
    return entries.items[0];
}
