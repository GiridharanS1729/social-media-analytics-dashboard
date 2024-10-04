import React from 'react'
import './leetcode.css';
export default function Leetcode({leetcodeID}) {
    return (
        <div>
            <h1>Leetcode</h1>
            <img width="500" src={`https://leetcard.jacoblin.cool/${leetcodeID}?theme=dark&font=Ubuntu&cache=14400&ext=contest&sheets=https://gist.githubusercontent.com/${leetcodeID}/5e715e284c89cace8f5fa09f7fb930b8/raw/ec0be570f114124b1a2156a660d67baa0ab5639d/leetcode_stats_card.css`} alt="Giridharan S Leetcode Stats" />
            <br /><br /><br /><br /><br />
            <iframe className='ifrm' src={`https://ltcstats.vercel.app/${leetcodeID}`} alt="Giridharan S Leetcode Stats" />

        </div>
    )
}
