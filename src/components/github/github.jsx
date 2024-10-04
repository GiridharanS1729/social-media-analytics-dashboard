import React from 'react'
import './github.css';

export default function Github({githubID}) {
    return (
        <div>
            <h1>
                Github
            </h1>
            <div class="container">

                <div class="github-stats">
                    <h2>📊 GitHub Stats:</h2>
                    <img src={`https://github-readme-stats.vercel.app/api?username=${githubID}&amp;theme=highcontrast&amp;hide_border=true&amp;include_all_commits=true&amp;count_private=false" alt="GitHub Stats`}/>
                    <img src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubID}&amp;theme=highcontrast&amp;hide_border=true" alt="GitHub Streak Stats`}/><br />
                    <img src={`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${githubID}&amp;theme=highcontrast" alt="Profile Stats`}/>
                    <img src={`http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${githubID}&amp;theme=highcontrast&amp;utcOffset=8" alt="Productive Time`}/>
                </div>


                <div class="top-languages">
                    <h2>🔝 Top Usage Languages:</h2>
                    <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubID}&amp;theme=highcontrast&amp;hide_border=true&amp;include_all_commits=true&amp;count_private=true&amp;layout=compact&amp;langs_count=10" alt="Top Languages`}/>
                    <img src={`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${githubID}&amp;theme=highcontrast" alt="Repos Per Language`}/>
                    <img src={`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${githubID}&amp;theme=highcontrast" alt="Most Commit Language`}/>
                </div>


                <div class="stardev-ranking">
                    <h2>🌟 StarDev Ranking</h2>
                    <a href="https://stardev.io/developers/${githubID}">
                        <img alt="Check out ${githubID}'s profile on stardev.io" width="480" src={`https://stardev.io/developers/${githubID}/badge/languages/locality.svg`}/>
                        <img alt="Check out ${githubID}'s profile on stardev.io" width="480" src={`https://stardev.io/developers/${githubID}/badge/languages/country.svg`}/>
                    </a>
                </div>


                <div class="github-trophies">
                    <h2>🏆 GitHub Trophies</h2>
                    <img src={`https://github-profile-trophy.vercel.app/?username=${githubID}&amp;theme=radical&amp;no-frame=false&amp;no-bg=true&amp;margin-w=5" alt="GitHub Trophies`}/>
                </div>



                <div class="contribution-graph">
                    <h2>🌟 GitHub Contribution Graph</h2>

                    <div class="profile-details">
                        <p align="center">
                            <a href="https://github.com/${githubID}">
                                <img align="center" src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${githubID}&amp;theme=dracula" alt="Profile Details`}/>
                            </a>
                        </p>
                    </div>
                    <a href="https://github-readme-activity-graph.vercel.app/graph?username=${githubID}&amp;bg_color=312b2e&amp;color=54f2cb&amp;line=f218e3&amp;point=38f702&amp;area=true&amp;hide_border=true">
                        <img src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubID}&amp;bg_color=312b2e&amp;color=54f2cb&amp;line=f218e3&amp;point=38f702&amp;area=true&amp;hide_border=true" alt="GitHub Contribution Graph`}/>
                    </a>
                </div>

            </div>


        </div>
    )
}
