import classnames from 'classnames';
import styles from '../../styles/partials/showcaseWidgetPair.module.css';
import utilStyles from '../../styles/utils.module.css';

import { Card, ErrorButton } from '../../components';
import { BlogItem, DataWidget } from '../../components/widgets';
import { useState } from 'react';
import { getVillager } from '../../lib/villagers';
import Image from 'next/image';

export const ShowcaseWidgetPair = ({ villagersData, featuredBlog }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [villagerToShow, setVillagerToShow] = useState(villagersData.data);

  const todaysDateMatchingAcApi = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }`;
  const isBirthday = () => villagerToShow.birthday === todaysDateMatchingAcApi;

  const newVillager = async () => {
    const applyLoadingStateIfSlow = setTimeout(() => {
      setLoading(true);
    }, 250);

    try {
      setVillagerToShow(
        await getVillager(Math.floor(Math.random() * villagersData.max))
      );
      setError(false);
    } catch {
      setError(true);
    }

    setLoading(false);
    clearTimeout(applyLoadingStateIfSlow);
  };

  return (
    <div
      className={classnames(
        utilStyles.grid,
        utilStyles.gridAlignCenter,
        styles.wrapper
      )}
    >
      <div className={styles.content}>
        <h3>... but mainly just build tbh 🕸</h3>
        <p>
          Software Engineer, Fullstack Developer, <i>wind-up merchant...</i>{' '}
          <br />
          I've been called a lot of things in the last 5 years. Nowadays,{' '}
          <strong>Creative Developer</strong> tends to stick the most. A mix of
          design, front-end (my bread & butter), and a technical fullstack
          challenge is where I shine. Some back-end, to learn as I go, is a
          plus!
        </p>
      </div>
      <Card type="blog">
        <BlogItem
          id={featuredBlog.id}
          image={featuredBlog.image}
          authors={featuredBlog.authors}
          description={featuredBlog.description}
          publishedAt={featuredBlog.publishedAt}
          title={featuredBlog.title}
          tag={featuredBlog.tag}
          url={`/diary/${featuredBlog.id}`}
        />
      </Card>
      <Card>
        <DataWidget
          title="Animal Crossing 🐶"
          description={
            error ? (
              <strong>couldn't fetch villager 🥺</strong>
            ) : (
              <>
                {isBirthday() ? (
                  <>
                    happy birthday<span className={utilStyles.accent}>, </span>
                  </>
                ) : (
                  <>
                    give it up for<span className={utilStyles.accent}>.. </span>
                  </>
                )}
                {loading ? (
                  <strong>wait for it</strong>
                ) : (
                  <strong>
                    {villagerToShow.name}
                    <span className={utilStyles.accent}>!✨</span>
                  </strong>
                )}
              </>
            )
          }
          data={[
            {
              title: 'Species 🌸',
              description: loading
                ? 'Loading...'
                : error
                ? '---'
                : villagerToShow.species
            },
            {
              title: 'Birthday 🍰',
              description: loading
                ? 'Loading...'
                : error
                ? '---'
                : isBirthday()
                ? 'Today! 🎉'
                : villagerToShow.birthdayString
            },
            {
              title: 'Hobby 🤸🏻',
              description: loading
                ? 'Loading...'
                : error
                ? '---'
                : villagerToShow.hobby
            },
            {
              title: 'Character 🥺',
              description: loading
                ? 'Loading...'
                : error
                ? '---'
                : villagerToShow.personality
            }
          ]}
          image={
            <div
              className={styles.animalWrapper}
              style={{ borderColor: villagerToShow.color }}
            >
              <Image
                className={styles.animal}
                src={villagerToShow.image.url}
                style={{ borderColor: villagerToShow.color }}
                alt={`Headshot of ${villagerToShow.name}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          button={
            villagersData.max && (
              <ErrorButton
                text={error ? 'try again' : 'find someone else'}
                retryFunction={newVillager}
              />
            )
          }
          footer={
            <p className={utilStyles.fontCute}>
              💭{' '}
              {loading
                ? 'Loading...'
                : error
                ? '---'
                : `"${villagerToShow.saying}"`}
            </p>
          }
        />
      </Card>
      <div className={styles.content}>
        <h3>👈🏼 Why did I make this</h3>
        <p className={classnames(utilStyles.fontCute, utilStyles.textSmoke)}>
          i can't believe i put this on my website
        </p>
        <p>
          I operate periodically, as a <strong>contractor</strong> or{' '}
          <strong>freelancer</strong>, either independently or integrated into
          an existing team.
        </p>
      </div>
    </div>
  );
};
