<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceDownNotification extends Notification
{

    public $site;



    /**
     * Create a new notification instance.
     */
    public function __construct($site)
    {
        $this->site = $site;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->error() 
            ->subject('Alert - Service Down: ' . $this->site->name)
            ->line('Atention ! Service with URL: ' . $this->site->url . ' is down with status code: ' . $this->site->status)
            ->line('Name for service: ' . $this->site->name) 
            ->action('View Service', url('/dashboard'))
            ->line('Thank you for using our monitoring service!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
