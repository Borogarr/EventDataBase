VAGRANTFILE_API_VERSION = '2'

# https://lumberjaph.net/provision-an-ec2-instance-with-vagrant-and-ansible/
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.provision :ansible do |ansible|
         ansible.playbook = 'provision/vagrant.yml'
    end

    # This configuration is for our local box, when we use virtualbox as the provider
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

    # This configuration is for our EC2 instance
    # config.vm.provider :aws do |aws, override|
    #     aws.access_key_id = 'access key'
    #     aws.secret_access_key = 'secret access key'
    #     # ubuntu AMI
    #     aws.ami = 'ami-e7582d8e'
    #     aws.keypair_name = 'vagrant'
    #     aws.security_groups = ['default', 'quicklaunch-1']

    #     override.vm.box = 'dummy'
    #     override.vm.box_url = 'https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box'
    #     override.ssh.username = 'ubuntu'
    #     override.ssh.private_key_path = 'vagrant.pem'
    # end
end
