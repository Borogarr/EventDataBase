VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    config.vm.provider :virtualbox do |vb, override|
        override.vm.box = 'precise64'
        override.vm.box_url = 'http://files.vagrantup.com/precise64.box'
    end

    config.vm.network :forwarded_port, guest: 5000, host: 5000
    config.vm.network :forwarded_port, guest: 5432, host: 5432

    config.vm.provider :virtualbox do |vb|
        vb.customize ["modifyvm", :id, "--memory", "1024"]
        vb.customize ["modifyvm", :id, "--cpus", "4"]
    end
end
