<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
//Library for scheduling tasks
use Illuminate\Support\Facades\Schedule;


Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::command('monitor:check')->everySecond()->withoutOverlapping();