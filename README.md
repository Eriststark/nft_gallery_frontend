# nft_gallery_frontend
Frontend to display NFTs using Vottun APIs
This is a frontend code to display the NFTs I minted using Vottun APIs. You can also use this code as a template for your own projects. You just have to input your own data for the following variables in the javascript file:

    apiKey 
    appId
    ContractAddress
    network
    nftList

The NFTs will be displayed in the order in which you put them in the "nftList" variable.
If you use a blockchain other than the Polygon Amoy Tesnet, you should also update this part in the javascrip file:

txinfoLink.href = `https://amoy.polygonscan.com/tx/${txhash}`;
    
