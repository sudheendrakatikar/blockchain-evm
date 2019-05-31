export class Vote {
    _id: string; //unique vote id
    voter_id_hash: string; // to check if voter has voted
    candidate_id: string; // while counting votes
    transaction_id: string; // return to the voter
    verifier_hash: string; // verification hash(candidate_id+transaction_id)
}