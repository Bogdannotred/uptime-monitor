<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Bus\Queueable;

class ServiceDownNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $tries = 1;
    
    public $site;
    public $isUp;


    /**
     * Create a new notification instance.
     */
    public function __construct($site , bool $isUp = false)
    {
        $this->site = $site;
        $this->isUp = $isUp;
        $this->onQueue('notifications');
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
            $message = new MailMessage;
            
            if ($this->isUp) {
                $message->success() 
                        ->subject('✅ Service Back Online: ' . $this->site->name)
                        ->line('Great news! Service with URL: ' . $this->site->url . ' is back online.');
            } else {
                $message->error() 
                        ->subject('🚨 Alert - Service Down: ' . $this->site->name)
                        ->line('Attention! Service with URL: ' . $this->site->url . ' is down.');
            }

            return $message
                ->line('Status recorded: ' . $this->site->status)
                ->action('View Dashboard', url('/dashboard'))
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
