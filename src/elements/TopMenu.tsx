import React from 'react'
import TopButton from './TopButton'

import { useTranslation } from 'react-i18next';

const TopMenu = () => {
    const { t } = useTranslation()

    return (
        <div className="w-full flex flex-row flex-wrap shadow-xl bg-mc-b300 mt-8 h-8 z-2">
            <TopButton onClick={() => '.'} imgSrc="../assets/img/credits.png" text={t('credits.title')}/>
            <TopButton onClick={() => '.'} imgSrc="../assets/img/skin.png" text={t('skins.title')} />
            <div className="flex-1"></div>
            <TopButton onClick={() => '.'} imgSrc="../assets/img/donate.png" text={t('donate.title')}/>
            <TopButton onClick={() => '.'} imgSrc="../assets/img/settings.png"/>
        </div>
    )
}

export default TopMenu