import pkg from 'contentful-management';
const { createClient } = pkg;

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID || 'qc084p3r3k7g';
const ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function main() {
    console.log('Connecting to Contentful...');
    const client = createClient({
        accessToken: ACCESS_TOKEN,
    });

    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Creating "Blog Post" content type...');
    let contentType;
    try {
        contentType = await environment.createContentTypeWithId('blogPost', {
            name: 'Blog Post',
            fields: [
                {
                    id: 'title',
                    name: 'Title',
                    type: 'Symbol',
                    required: true,
                },
                {
                    id: 'slug',
                    name: 'Slug',
                    type: 'Symbol',
                    required: true,
                },
                {
                    id: 'excerpt',
                    name: 'Excerpt',
                    type: 'Text',
                    required: true,
                },
                {
                    id: 'content',
                    name: 'Content',
                    type: 'Text',
                    required: true,
                },
                {
                    id: 'date',
                    name: 'Date',
                    type: 'Date',
                    required: true,
                },
                {
                    id: 'category',
                    name: 'Category',
                    type: 'Symbol',
                    required: true,
                },
                {
                    id: 'readTime',
                    name: 'Read Time',
                    type: 'Symbol',
                    required: false,
                },
            ],
        });
        console.log('Content Type "blogPost" created.');
    } catch (error) {
        if (error.name === 'ValidationFailed' && error.message.includes('id')) {
            console.log('Content Type "blogPost" already exists. Updating...');
            contentType = await environment.getContentType('blogPost');
        } else {
            throw error;
        }
    }

    // Publish the content type
    if (contentType) {
        await contentType.publish();
        console.log('Content Type "blogPost" published!');
    }
}

main().catch(console.error);
