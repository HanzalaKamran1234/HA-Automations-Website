import { createClient } from 'contentful';

const client = createClient({
    space: 'qc084p3r3k7g',
    accessToken: 'uvAYtoEkeN1DBRILg-PgHzS3XaGAJrYZeyJpkQxMHu8',
});

async function debugContentful() {
    console.log("--- Checking Content Types ---");
    try {
        const types = await client.getContentTypes();
        types.items.forEach(type => {
            console.log(`Name: ${type.name}`);
            console.log(`ID:   ${type.sys.id}`);
            console.log(`Fields: ${type.fields.map(f => f.id).join(', ')}`);
            console.log("-------------------");
        });

        console.log("\n--- Checking Entries ---");
        const entries = await client.getEntries();
        if (entries.items.length === 0) {
            console.log("No published entries found.");
        } else {
            entries.items.forEach(entry => {
                console.log(`Entry ID: ${entry.sys.id}`);
                console.log(`Content Type: ${entry.sys.contentType.sys.id}`);
                console.log(`Status: Published`);
                console.log("-------------------");
            });
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

debugContentful();
