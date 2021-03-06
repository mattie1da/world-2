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
        <p>
          With 5 years of experience, I've worn a few different hats and titles;{' '}
          <strong>Front-end Developer</strong>, Full Stack Developer, and more
          recently '<strong>Creative Developer</strong>'.
        </p>
        <p>
          As a <strong>freelancer</strong> / <strong>contractor</strong>; I
          operate periodically, either independently or integrated into an
          existing team.
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
          title="Animal Crossing ????"
          description={
            error ? (
              <strong>couldn't fetch villager ????</strong>
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
                    <span className={utilStyles.accent}>!???</span>
                  </strong>
                )}
              </>
            )
          }
          data={[
            {
              title: 'Species ????',
              description: loading
                ? 'Loading...'
                : error
                ? '---'
                : villagerToShow.species
            },
            {
              title: 'Birthday ????',
              description: loading
                ? 'Loading...'
                : error
                ? '---'
                : isBirthday()
                ? 'Today! ????'
                : villagerToShow.birthdayString
            },
            {
              title: 'Hobby ????????',
              description: loading
                ? 'Loading...'
                : error
                ? '---'
                : villagerToShow.hobby
            },
            {
              title: 'Character ????',
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
              ????{' '}
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
        <h3>Approach</h3>
        <p>
          My aim is to deliver a product that{' '}
          <strong>withstands the test of time</strong>. I prioritise{' '}
          <strong>communication</strong>, well-written{' '}
          <strong>documentation</strong>, component <strong>reusability</strong>
          , <strong>accessibility</strong> and <strong>consistency</strong>.
          <br />
        </p>
        <p className={classnames(utilStyles.fontCute, utilStyles.textSmoke)}>
          "One day, son, all this legacy code will be yours."
        </p>
      </div>
    </div>
  );
};
