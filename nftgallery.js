document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.getElementById('nft-gallery');
    const apiEndpoint = 'https://api.vottun.tech/erc/v1/erc721/tokenUri';
    let item = 0; // Keep track of the current txhash index
    //replace the below variables with your own data
    const apiKey = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyaW5xaHBKOW82ekZheDd2ZDRNVXpsQkJWWWMiLCJ0eXBlIjoiZXJwIiwiaWQiOiIiLCJ1c2VybmFtZSI6ImVkdG0xMEBnbWFpbC5jb20iLCJjaWQiOiJkZWFkNzlmNi1hYjAzLTQ3ODItOGZmZC1hZjZjMjE4NjEyODAiLCJza3UiOlt7InIiOjExLCJzIjo4LCJlIjowfSx7InIiOjExLCJzIjo4MDAxLCJlIjowfSx7InIiOjExLCJzIjo4MDAyLCJlIjowfSx7InIiOjExLCJzIjo4MDAzLCJlIjowfSx7InIiOjExLCJzIjo4MDA1LCJlIjowfSx7InIiOjExLCJzIjo4MDEwLCJlIjowfSx7InIiOjExLCJzIjozLCJlIjowfV0sInB1YyI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.KvauYeZZgejHLws9cDHvign7ISmeN0ig9Th32gUfbYeWYHvQBsYNVAFPGg_9Q5QUOwd0eYzqg9zJAvt2wNtrh99jhE75K0DssBdGzN2XwvNhttM3LBLlnugPq2LnXXFKMv0OeuYzSPphRPsTjTmRNr1SXd148LcHdDo7vFP4SmMcRM0JClfKkSUabNwSsaksxWVP_KT9ztoQ8zb6qSgSyHjNfhLSRiIDxut9AhJNRdrBntNJ_II4BzG3cRVH3wwQs-EN0wKBgrNvRc6dm6XKTDEa-9u1XOUU_uvZ3irohM6u1Ff81jI4nzulLOykdpM0kPQuRZIoo5zVBWspjL9QOWi136seN6eT_tYrXXOzp_vr5ooaOBqLxMHHgbv-5x5X5mCpS0IvpSUvk0b3m-ILfqqync-YE7CUskUSNgbjvvs6ngwTynCLgc4PLRQF0RkUlucj4wcqW04UCaKFwkZdv1l2ZAO_7DPIQH8GWk3rEzWquxTXDnFNKszP82ATJPnutCOvTLRv70NFyvb0xF2yqOl94ZJLNrzYmVj1gyDPvgJpx4OceAlVvjuj0R94FzdmYX9-oVtudme2SHMJvgyOiAXx8MvT3_e-ADkUYpMyStN_81TOBXivOZT2JP3_uMkmf-WlcSBj5jKEIuMI51nYXzp-8LaeMOHbokby1UA27Mo';
    const appId = '1k21orZXUK92MTql4kPB1cUfHW_y_wtBSVn7y260PCCG4vRQ8NZEkYfGCqkUk3TV';
    const contractAddress = "0xD7B368D30A17741C342BA8b7D41Ad4071BE9353A";
    const network = 80002;
    //details of each nft 
    const nft_list = [
    {id: 1, txhash: "0xede903fe74e369a3059a6a4a66be7d6ce74ccef6be75e94fb6732b54a255b383"},
    {id: 2, txhash: "0xc60d9e8056e07bb4eb72328f45fb52925e94763187fbccfdf50b9af37f5f93e1"},
    {id: 3, txhash: "0xe5d5886ab486556a168ae6f7aa3eedec76626264d43f308595abb780a6f4c38b"},
    {id: 4, txhash: "0xb3a686379f4bd446d46856055a22dbe483822b9144c1a4d2c769bb7c62c63900"},
    {id: 5, txhash: "0x06c3194c862956160683fe925e99b0f4a40c86a87d2da23924eaa31f1d99e81b"},
    {id: 6, txhash: "0x7fef33dd8cd018337354e250f45db23f5a5a1b54bec6a6bfad40b23a4458495b"},
    {id: 7, txhash: "0xaf3441144245b8058196676034adbb6182a4b9cb8cd33062898ee95e54270170"},
    {id: 8, txhash: "0x280adbfbef264e5cb379645ec7ddbbc50066a476e9e2d92181164e73790325ae"},
    {id: 9, txhash: "0x1a6d31b0ed8797398209e814ff4ee22846c02c860aab7e4d6a4a03fac77dfb81"},
    {id: 10, txhash: "0xc1a4b7e8007090e8ea62fd22f0c5640119c420ec4f993b667cf4a30b5371cd00"}
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

async function createNFTCard(uriData, metadata, txhash) {
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
        txinfoLink.href = `https://amoy.polygonscan.com/tx/${txhash}`;
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
        for (let nft of nft_list) {
            let id = nft["id"];
            
            bodies.push({
                contractAddress: contractAddress,
                network: network,
                id: id
            });
        }

        // Sequentially process each NFT
        for (const body of bodies) {
            const nft = nft_list[item++];
            const txhash = nft["txhash"];
            const metadata = await fetchMetadata(body);
            const uriData = await fetchURI(metadata.uri);
            await createNFTCard(uriData, metadata, txhash);
        }

    } catch (error) {
        console.error('Error fetching NFTs:', error);
    }
});

