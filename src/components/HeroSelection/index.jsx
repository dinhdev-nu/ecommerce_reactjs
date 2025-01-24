import styles from './index.module.scss'

const HeroSelection = () => {

    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>OUR NEW PORDUCT</h1>
            <div>
                
                <input className={styles.searchBar} 
                    type="text"
                    placeholder='Search'
                />
            </div>
        </div>
    )

}

export default HeroSelection
