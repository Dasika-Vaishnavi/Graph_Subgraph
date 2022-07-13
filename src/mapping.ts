import{
    TokenURIUpdated as TokenURIUpdatedEvent,
    Transfer as TransferEvent,
    Token as TokenContract
} from "../generated/Token/Token"

import {
    Token, User
}from '../generated/schema'

export function handleTransfer(event: TransferEvent): void {
    let token = Token.load(event.params.tokenId.toString());
    if(!token){
        token = new Token(event.params.tokenId.toString());
        token.Creator = event.params.to.toHexString();
        token.tokenID = event.params.tokenId;
        token.CreatedAtTimestamp = event.block.timestamp;
        
        let tokenContract = TokenContract.bind(event.address);
        token.contentURI = tokenContract.tokenURI(event.params.tokenId);
        token.metadataURI = tokenContract.tokenMetadataURI(event.params.tokenId);
    }
    token.owner = event.params.to.toHexString();
    token.save();

    let user = User.load(event.params.to.toHexString());
    if (!user){
        user = new User(event.params.to.toHexString());
        user.save();
    }
}

export function handleTokenURIUpdated(event: TokenURIUpdatedEvent ): void{
    let token = Token.load(event.params._tokenId.toString());
    if (token != null){
        token = Token.load(event.params._tokenId.toString());
}
}
