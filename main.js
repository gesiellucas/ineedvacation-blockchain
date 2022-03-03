const SHA256 = require('js-sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce +JSON.stringify(this.data));
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined: '+this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, '02/09/2022', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isValidChain(){
        for(let i = 1; i < this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash() ){
                return true;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let vacancy = new Blockchain();
console.log('Mined 1 .........')
vacancy.addBlock(new Block(1, '02/01/2022', {amount:4}));
console.log('Mined 2 .........')
vacancy.addBlock(new Block(2, '09/01/2022', {amount:90}));
console.log('Mined 3 .........')
vacancy.addBlock(new Block(2, '09/01/2022', {amount:70}));
