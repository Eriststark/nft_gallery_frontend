document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.getElementById('nft-gallery');
    const apiEndpoint = 'https://api.vottun.tech/erc/v1/erc721/tokenUri';
    let item = 0; // Keep track of the current txhash index
    //replace the below variables with your own data
    const apiKey = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA0NzE4MTksImp0aSI6IjJpSVFzZHpyZUMxTTh0dGY5MjBmVDRxNGpRTyIsInR5cGUiOiJlcnAiLCJpZCI6IiIsInVzZXJuYW1lIjoiZWR0bTEwQGdtYWlsLmNvbSIsImNpZCI6ImRlYWQ3OWY2LWFiMDMtNDc4Mi04ZmZkLWFmNmMyMTg2MTI4MCIsInNrdSI6W3siciI6MTEsInMiOjgsImUiOjB9LHsiciI6MTEsInMiOjgwMDEsImUiOjB9LHsiciI6MTEsInMiOjgwMDIsImUiOjB9LHsiciI6MTEsInMiOjgwMDMsImUiOjB9LHsiciI6MTEsInMiOjgwMDUsImUiOjB9LHsiciI6MTEsInMiOjgwMTAsImUiOjB9LHsiciI6MTEsInMiOjMsImUiOjB9XSwicHVjIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIn0.hceH4e3JeIg4bBYN0u0ISgayrHvQgiErcMKQAPbYJoOnu75CJSjLOUJ4KsY46LspFjyZNDlHv9A4kbIWrqttPP5AN-MxA6ZKj8nNLHIcQ9crrEkVo9G7OJZJ-QFe1lXDoFugiBgcdU9ZOKr5agXh1fCGmtYVGLU8V7r8NWWupkaYJrmVxaXABNQsTXTb8XiB7iHdRX6tdSfJQpgFcZTE-Z-_Jwtzszukatb2OPJAtMo21BjX2pxb8-VnF6s4gCtpRxrXcCcGMgFxieKcYQdy3W6k2zilzBXmH3aZlmP7cOoPv7usFb1LQ6rttfACf0w_LHbG3YrqvjVK_HWV_10BR2D9qOzgPbrxDkyzthIYA6yJqPLCZW5jWVMD19JDrMuxKVfi5m-2rY6nKyVbkVehxzX5syTyf5SkkKzcPZGZXCfwFMgvmnmIAYWD05DRhcxqkNBWhLL9HWh1-6HQUwVDAsayBw5aakouiW1a360ASSEnHG4w0oeeqh5j-27Kwx87a6OrdeU-kAoatlppbdFGVvlWy9ULvKb9FescwCoATJQJUqzzviOdFz_FQ4S7CXRar7yeWLs1pQInvZsR2VcxHQ33mqCKwAw_aD0R1r0p5hBMWQFTblbwD7H9r9cC_AuskUNi1ExGljggqjKeVgsutg2tUYx7LWHqizzS5frgKqM';
    const appId = '1k21orZXUK92MTql4kPB1cUfHW_y_wtBSVn7y260PCCG4vRQ8NZEkYfGCqkUk3TV';
    const contractAddress = "0xD7B368D30A17741C342BA8b7D41Ad4071BE9353A";
    const network = 80002;
    //txhash of each nft minted 
    const txhashes = [
        "0xede903fe74e369a3059a6a4a66be7d6ce74ccef6be75e94fb6732b54a255b383",
        "0xc60d9e8056e07bb4eb72328f45fb52925e94763187fbccfdf50b9af37f5f93e1",
        "0xe5d5886ab486556a168ae6f7aa3eedec76626264d43f308595abb780a6f4c38b",
        "0xb3a686379f4bd446d46856055a22dbe483822b9144c1a4d2c769bb7c62c63900",
        "0x06c3194c862956160683fe925e99b0f4a40c86a87d2da23924eaa31f1d99e81b",
        "0x7fef33dd8cd018337354e250f45db23f5a5a1b54bec6a6bfad40b23a4458495b",
        "0xaf3441144245b8058196676034adbb6182a4b9cb8cd33062898ee95e54270170",
        "0x280adbfbef264e5cb379645ec7ddbbc50066a476e9e2d92181164e73790325ae",
        "0x1a6d31b0ed8797398209e814ff4ee22846c02c860aab7e4d6a4a03fac77dfb81",
        "0xc1a4b7e8007090e8ea62fd22f0c5640119c420ec4f993b667cf4a30b5371cd00"
    ];

    // Function to fetch metadata from API
    async function fetchMetadata(body) {
        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'x-application-vkn': appId,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch metadata');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching metadata:', error);
            throw error;
        }
    }

    // Function to fetch URI data from metadata
    async function fetchURI(uri) {
    try {
        const uriResponse = await fetch(uri);

        if (!uriResponse.ok) {
            throw new Error(`Failed to fetch URI: ${uri}`);
        }

        return await uriResponse.json();
    } catch (error) {
        console.error('Error fetching URI:', error);
        throw error;
    }
}

async function createNFTCard(uriData, metadata) {
    try {
        if (!uriData.image) {
            throw new Error('No image link found in URI data');
        }

        let nftCard = document.createElement("div");
        nftCard.classList.add("nft-card");

        let imageElement = document.createElement("img");
        imageElement.src = uriData.image;
        imageElement.alt = "NFT Image";

        // Add event listener to view image in a new tab when clicked
            imageElement.addEventListener('click', () => {
                window.open(uriData.image, '_blank');
            });

        // Ensure image is loaded before appending to card
        await new Promise((resolve, reject) => {
            imageElement.onload = resolve;
            imageElement.onerror = reject;
        });

        nftCard.appendChild(imageElement);

        let detailsContainer = document.createElement("div");
        detailsContainer.classList.add("details");

        // View Image Link
        let imageLinkContainer = document.createElement("div");
        let imageLink = document.createElement("a");
        imageLink.href = uriData.image;
        imageLink.target = "_blank";
        imageLink.textContent = "View Image";
        imageLinkContainer.appendChild(imageLink);
        detailsContainer.appendChild(imageLinkContainer);

        // Metadata Link
        let metadataContainer = document.createElement("div");
        let metadataLink = document.createElement("a");
        metadataLink.href = metadata.uri;
        metadataLink.target = "_blank";
        metadataLink.textContent = "Metadata Link";
        metadataContainer.appendChild(metadataLink);
        detailsContainer.appendChild(metadataContainer);

        // Transaction Info Link
        let txinfoLinkContainer = document.createElement("div");
        let txinfoLink = document.createElement("a");
        txinfoLink.href = `https://amoy.polygonscan.com/tx/${txhashes[item++]}`;
        txinfoLink.target = "_blank";
        txinfoLink.textContent = "Transaction Info Link";
        txinfoLinkContainer.appendChild(txinfoLink);
        detailsContainer.appendChild(txinfoLinkContainer);

        nftCard.appendChild(detailsContainer);
        galleryElement.appendChild(nftCard);
    } catch (error) {
        console.error('Error creating NFT card:', error);
    }
}

    // Main execution logic
    try {
        const bodies = [];
        //id range depends on the ids you your nfts, the range yould should be continues
        for (let id = 1; id <= 10; id++) {
            bodies.push({
                contractAddress: contractAddress,
                network: network,
                id: id
            });
        }

        // Sequentially process each NFT
        for (const body of bodies) {
            const metadata = await fetchMetadata(body);
            const uriData = await fetchURI(metadata.uri);
            await createNFTCard(uriData, metadata);
        }

    } catch (error) {
        console.error('Error fetching NFTs:', error);
    }
});
