import type { MockAPIResponse } from '../types';

export const mockAIService = {
    processVideo: async (file: File): Promise<MockAPIResponse> => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
            fullTranscript: "歡迎來到我們的產品介紹。今天我要向大家展示一個令人興奮的新功能。這個功能將徹底改變您使用我們產品的方式。讓我們從基本概念開始說起。首先，我們需要了解用戶的真實需求。通過深入的市場研究，我們發現了一個重要的痛點。為了解決這個問題，我們的團隊投入了大量的時間和精力。經過反覆的測試和優化，我們終於找到了最佳解決方案。",
            sections: [
                {
                    id: 'section-1',
                    title: '產品介紹開場',
                    sentences: [
                        {
                            id: 'sent-1',
                            text: '歡迎來到我們的產品介紹。',
                            startTime: 0,
                            endTime: 3,
                            isSelected: true
                        },
                        {
                            id: 'sent-2',
                            text: '今天我要向大家展示一個令人興奮的新功能。',
                            startTime: 3,
                            endTime: 7,
                            isSelected: true
                        },
                        {
                            id: 'sent-3',
                            text: '這個功能將徹底改變您使用我們產品的方式。',
                            startTime: 7,
                            endTime: 11,
                            isSelected: false
                        }
                    ]
                },
                {
                    id: 'section-2',
                    title: '需求分析',
                    sentences: [
                        {
                            id: 'sent-4',
                            text: '讓我們從基本概念開始說起。',
                            startTime: 11,
                            endTime: 14,
                            isSelected: false
                        },
                        {
                            id: 'sent-5',
                            text: '首先，我們需要了解用戶的真實需求。',
                            startTime: 14,
                            endTime: 18,
                            isSelected: true
                        },
                        {
                            id: 'sent-6',
                            text: '通過深入的市場研究，我們發現了一個重要的痛點。',
                            startTime: 18,
                            endTime: 23,
                            isSelected: true
                        }
                    ]
                },
                {
                    id: 'section-3',
                    title: '解決方案',
                    sentences: [
                        {
                            id: 'sent-7',
                            text: '為了解決這個問題，我們的團隊投入了大量的時間和精力。',
                            startTime: 23,
                            endTime: 28,
                            isSelected: false
                        },
                        {
                            id: 'sent-8',
                            text: '經過反覆的測試和優化，我們終於找到了最佳解決方案。',
                            startTime: 28,
                            endTime: 33,
                            isSelected: true
                        }
                    ]
                }
            ],
            suggestedHighlights: ['sent-1', 'sent-2', 'sent-5', 'sent-6', 'sent-8']
        };
    }
};
