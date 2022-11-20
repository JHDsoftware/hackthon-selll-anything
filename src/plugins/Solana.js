import {clusterApiUrl, Connection, Keypair, PublicKey} from '@solana/web3.js';
import {createQR, encodeURL, findReference} from '@solana/pay';
import BigNumber from 'bignumber.js';
import {v4 as uuidv4} from 'uuid';

export async function solana(money, father) {

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

    const recipient = new PublicKey('6qVjoMn1BixfqVVkYt1b1oTiv2C5eJz5Zm77WJicyjzn')
    const amount = new BigNumber(money)
    const reference = new Keypair().publicKey
    const label = 'TradeAny'
    const message = 'TradeAny Recharge Program';
    const memo = uuidv4()
    const url = encodeURL({recipient, amount, reference, label, message, memo})

    createQR(url, 200).append(father)
    console.log('\n5. Find the transaction');
    await new Promise(r => setTimeout(r, 15000));
    return await findReference(connection, reference, {finality: 'confirmed'})
}
