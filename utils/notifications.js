import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const FLASHCARDS_NOTIFICATIONS_KEY = 'dd:FlashCardsNotifications'

function createNotification() {
    return {
      title: 'Take a quiz with Flashcards!',
      body: "Don't forget to take a quiz today to review important information in the Flashcards application",
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  }

export function setLocalNotification() {
    AsyncStorage.getItem(FLASHCARDS_NOTIFICATIONS_KEY)
      .then(JSON.parse)
      .then((data) => {
        if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if(status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(15)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                )
                AsyncStorage.setItem(FLASHCARDS_NOTIFICATIONS_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }

  export function clearLocalNotification() {
    return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATIONS_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }