import {
  GamificationLevel,
  Memori,
  Tenant,
  Venue,
  User,
} from '@memori.ai/memori-api-client/src/types';
import React, { useState, useEffect } from 'react';
import { getResourceUrl } from '../../helpers/media';
import { useTranslation } from 'react-i18next';
import Tooltip from '../ui/Tooltip';
import { getTranslation } from '../../helpers/translations';
import Button from '../ui/Button';
import Translation from '../icons/Translation';
import { chatLanguages } from '../../helpers/constants';
import BlockedMemoriBadge from '../BlockedMemoriBadge/BlockedMemoriBadge';
import AI from '../icons/AI';
import Group from '../icons/Group';
import DeepThought from '../icons/DeepThought';
import CompletionProviderStatus from '../CompletionProviderStatus/CompletionProviderStatus';

export interface Props {
  memori: Memori;
  tenant?: Tenant;
  gamificationLevel?: GamificationLevel;
  language?: string;
  userLang?: string;
  setUserLang: (lang: string) => void;
  baseUrl?: string;
  apiUrl?: string;
  position?: Venue;
  openPositionDrawer: () => void;
  integrationConfig?: { [key: string]: any };
  instruct?: boolean;
  sessionId?: string;
  clickedStart?: boolean;
  onClickStart?: () => void;
  initializeTTS?: () => void;
  _TEST_forceProviderStatus?: string;
  isUserLoggedIn?: boolean;
  user?: User;
}

const StartPanel: React.FC<Props> = ({
  memori,
  tenant,
  gamificationLevel,
  language,
  userLang,
  setUserLang,
  baseUrl,
  apiUrl,
  position,
  openPositionDrawer,
  integrationConfig,
  instruct = false,
  clickedStart,
  onClickStart,
  initializeTTS,
  _TEST_forceProviderStatus,
  isUserLoggedIn = false,
  user,
}) => {
  const { t, i18n } = useTranslation();
  const [translatedDescription, setTranslatedDescription] = useState(
    memori.description
  );
  const [showTranslation, setShowTranslation] = useState(true);
  const toggleTranslations = () => {
    setShowTranslation(show => !show);
  };

  useEffect(() => {
    if (
      (i18n.language?.toUpperCase() ?? 'IT') !==
        (language?.toUpperCase() ?? 'IT') &&
      !!memori.description?.length
    ) {
      getTranslation(
        memori.description,
        i18n.language?.toUpperCase() ?? 'IT',
        language,
        baseUrl
      )
        .then(value => {
          setTranslatedDescription(value.text);
        })
        .catch(console.error);
    }
  }, [i18n.language, language, memori.description, baseUrl]);

  return (
    <div className="memori--start-panel">
      <div
        className="memori--cover"
        style={{
          backgroundImage: `url("${getResourceUrl({
            type: 'cover',
            tenantID: tenant?.id,
            resourceURI: memori.coverURL,
            baseURL: baseUrl,
            apiURL: apiUrl,
          })}"), url("${getResourceUrl({
            type: 'cover',
            tenantID: tenant?.id,
            baseURL: baseUrl,
            apiURL: apiUrl,
          })}")`,
        }}
      >
        {!!gamificationLevel?.badge?.length && !memori.enableBoardOfExperts && (
          <div className="memori--gamification-badge">
            <Tooltip
              align="left"
              content={`${t('gamification.level')} ${
                gamificationLevel.badge
              }, ${gamificationLevel.points} ${t('gamification.points')}`}
            >
              <span
                aria-label={`${t('gamification.level')} ${
                  gamificationLevel.badge
                }, ${gamificationLevel.points} ${t('gamification.points')}`}
              >
                {gamificationLevel.badge}
              </span>
            </Tooltip>
          </div>
        )}
        {!!memori.enableCompletions && !memori.enableBoardOfExperts && (
          <div className="memori--completions-enabled">
            <Tooltip align="left" content={t('completionsEnabled')}>
              <span aria-label={t('completionsEnabled') || 'Completions'}>
                <AI />
              </span>
            </Tooltip>
          </div>
        )}
        {!!memori.enableBoardOfExperts && (
          <div className="memori--board-of-experts">
            <Tooltip align="left" content={t('boardOfExperts')}>
              <span aria-label={t('boardOfExperts') || 'Board of Experts'}>
                <Group />
              </span>
            </Tooltip>
          </div>
        )}
        {!!memori.nsfw && (
          <div className="memori--nsfw">
            <Tooltip align="left" content={t('nsfw')}>
              <span title={t('nsfw') || 'NSFW'}>🔞</span>
            </Tooltip>
          </div>
        )}
      </div>
      <picture className="memori--avatar">
        <source
          src={
            memori.avatarURL ??
            getResourceUrl({
              type: 'avatar',
              tenantID: tenant?.id,
              resourceURI: memori.avatarURL,
              baseURL: baseUrl,
              apiURL: apiUrl,
            })
          }
        />
        <img
          alt={memori.name}
          src={
            memori.avatarURL && memori.avatarURL.length > 0
              ? getResourceUrl({
                  type: 'avatar',
                  tenantID: tenant?.id,
                  resourceURI: memori.avatarURL,
                  baseURL: baseUrl,
                  apiURL: apiUrl,
                })
              : getResourceUrl({
                  type: 'avatar',
                  tenantID: tenant?.id,
                  baseURL: baseUrl,
                  apiURL: apiUrl,
                })
          }
        />
      </picture>
      <h2 className="memori--title">{memori.name}</h2>
      {memori.needsPosition && !position && (
        <div className="memori--needsPosition">
          <p>{t('write_and_speak.requirePosition')}</p>
          <Button
            primary
            onClick={() => openPositionDrawer()}
            className="memori--start-button"
          >
            {t('widget.position')}
          </Button>
        </div>
      )}
      {((memori.needsPosition && position) || !memori.needsPosition) && (
        <div className="memori--description">
          <p>
            <span className="memori--description-text">
              {translatedDescription && showTranslation
                ? translatedDescription
                : memori.description}
            </span>

            {translatedDescription !== memori.description && (
              <Button
                ghost
                className="memori--translation-toggle"
                icon={<Translation />}
                onClick={() => toggleTranslations()}
              >
                {showTranslation
                  ? t('showOriginalText')
                  : t('showTranslatedText')}
              </Button>
            )}
          </p>

          {integrationConfig?.multilanguage && !instruct && (
            <div className="memori--language-chooser">
              <label id="user-lang-pref-label" htmlFor="user-lang-pref">
                {t('write_and_speak.iWantToTalkToIn', {
                  name: memori.name,
                })}
              </label>
              <select
                id="user-lang-pref"
                className="memori-select--button"
                value={(userLang ?? i18n.language).toUpperCase()}
                aria-labelledby="user-lang-pref-label"
                onChange={e => {
                  setUserLang(e.target.value);
                }}
              >
                {chatLanguages.map(lang => (
                  <option
                    key={lang.value}
                    value={lang.value}
                    aria-label={lang.label}
                  >
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            primary
            disabled={!!memori.blockedUntil && !memori.isGiver}
            loading={clickedStart}
            onClick={_e => {
              try {
                window.speechSynthesis.speak(
                  new SpeechSynthesisUtterance('') // This is needed to enable the speech synthesis on iOS
                );
              } catch (e) {
                console.error(e);
              }

              if (initializeTTS) initializeTTS();
              if (onClickStart) onClickStart();
            }}
            className="memori--start-button"
          >
            {t(
              `write_and_speak.${!instruct ? 'tryMeButton' : 'instructButton'}`
            )}
          </Button>

          <CompletionProviderStatus
            provider={memori.completionProvider}
            forceStatus={_TEST_forceProviderStatus}
          />

          <p className="memori--start-description">
            {instruct
              ? t('write_and_speak.pageInstructExplanation')
              : t('write_and_speak.pageTryMeExplanation')}
          </p>

          {!!memori.blockedUntil && (
            <BlockedMemoriBadge
              memoriName={memori.name}
              blockedUntil={memori.blockedUntil}
              showGiverInfo={memori.isGiver}
              showTitle
              marginLeft
            />
          )}

          {!!memori.enableDeepThought && !instruct && (
            <div className="memori--deep-thought-disclaimer">
              <Tooltip align="left" content={t('deepThoughtHelper')}>
                <DeepThought />
              </Tooltip>
              <h2>
                {isUserLoggedIn && !!user?.pAndCUAccepted
                  ? t('deepThoughtDisclaimerTitle')
                  : t('deepThought')}
              </h2>
              {isUserLoggedIn && !user?.pAndCUAccepted && (
                <p>{t('deepThoughtPreDisclaimerNotAllowed')}</p>
              )}
              {!isUserLoggedIn && (
                <p>{t('deepThoughtPreDisclaimerUnlogged')}</p>
              )}
              <p>{t('deepThoughtDisclaimer')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartPanel;
