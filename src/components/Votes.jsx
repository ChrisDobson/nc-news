import React from 'react';

export default function Votes({ votes, onVote, isVotingDisabled }) {
    return (
        <div className='vote-buttons'>
        <p><strong>{votes} {votes === 1 ? 'vote' : 'votes'}</strong></p>
            <button onClick={() => onVote(1)} disabled={isVotingDisabled}>Upvote</button>
            <button onClick={() => onVote(-1)} disabled={isVotingDisabled}>Downvote</button>
        </div>
    );
}