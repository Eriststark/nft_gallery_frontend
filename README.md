# nft_gallery_frontend
Frontend to display NFTs using Vottun APIs
This is a frontend code to display the NFTs I minted using Vottun APIs. You can also use this code as a template for your own projects. You just have to input your own data for the following variables in the javascript file:

	apiKey 
	appId
	ContractAddress
	txhashes
	network
	id

The "txhashes" is a list variable for the transaction hashes of the minting of the nfts. 
The for loop variable "id" is the id of the first nft to be displayed.
You should make sure that the ids of the NFTs you are going to display are consecutive, and you would have to input the range in the javascript file. You would see a variable named "id" within a for loop.

If you want to start from a specific nft id, other than the first one, you would have to modify the for loop variable "id" and the other parameters and conditions within that for loop, and also the variable "item". The variable "item" is the index of the txhash that will be attached to the first nft displayed, and from that index the next ones. 
